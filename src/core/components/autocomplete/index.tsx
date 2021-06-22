import {
  Fragment,
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  FormEvent
} from 'react'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { AlertCircle } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useOnClickOutside } from 'hooks'
import 'scss/base/bootstrap-extended/_include.scss'
import './index.scss'

interface AutocompleteProps {
  value?: string
  suggestions: any[]
  filterKey: string
  defaultValue?: string
  wrapperClass?: any
  filterHeaderKey?: string
  placeholder?: string
  suggestionLimit?: number
  grouped?: boolean
  autoFocus?: boolean
  customRender: any
  defaultSuggestions?: any
  className?: any
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>, userInput: any) => void
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onSuggestionsShown?: (userInput: any) => void
  onSuggestionClick?: (url: string, e: ChangeEvent<HTMLInputElement>) => void
  clearInput?: (userInput: any, setUserInput: any) => void
  externalClick?: () => void
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Autocomplete: React.FC<AutocompleteProps> = (props) => {
  const container = useRef<HTMLDivElement>(null)
  const inputElRef = useRef<HTMLInputElement>(null)
  const suggestionsListRef = useRef(null)

  const [focused, setFocused] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [userInput, setUserInput] = useState(props.value ? props.value : '')

  const history = useHistory()
  let filteredData: any = []

  // Suggestions item click event
  const onSuggestionItemClick = (
    url: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setActiveSuggestion(0)
    setShowSuggestions(false)
    setUserInput(filteredData[activeSuggestion][props.filterKey])
    if (url !== undefined && url !== null) {
      history.push(url)
    }

    if (props.onSuggestionClick) {
      props.onSuggestionClick(url, e)
    }
  }

  // Suggestion hover event
  const onSuggestionItemHover = (index: number) => {
    setActiveSuggestion(index)
  }

  // Input on change event
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value
    setActiveSuggestion(0)
    setShowSuggestions(false)
    setUserInput(userInput)
    if (parseInt((e.target as HTMLInputElement).value) < 1) {
      setShowSuggestions(false)
    }
  }

  const onInputClick = (e: FormEvent<EventTarget>) => {
    e.stopPropagation()
  }

  // Input's keydown event
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const filterKey = props.filterKey
    const suggestionList = ReactDOM.findDOMNode(
      suggestionsListRef.current
    ) as HTMLInputElement

    // user pressed the Up arrow
    if (e.key !== undefined && e.key === 'ArrowUp' && activeSuggestion !== 0) {
      setActiveSuggestion(activeSuggestion + 1)

      if (
        (e.target as HTMLInputElement).value.length > -1 &&
        suggestionList !== null &&
        activeSuggestion <= filteredData.length / 2
      ) {
        suggestionList.scrollTop = 0
      }
    } else if (
      e.key !== undefined &&
      e.key === 'ArrowDown' &&
      activeSuggestion < filteredData.length - 1
    ) {
      // user pressed the Down arrow
      setActiveSuggestion(activeSuggestion + 1)

      if (
        (e.target as HTMLInputElement).value.length > -1 &&
        suggestionList !== null &&
        activeSuggestion >= filteredData.length / 2
      ) {
        suggestionList.scrollTop = suggestionList.scrollHeight
      }
    } else if (e.key !== undefined && e.key === 'Escape') {
      // user pressed Escape
      setShowSuggestions(false)
      setUserInput('')
    } else if (e.key !== undefined && e.key === 'Enter') {
      // user pressed ENTER
      onSuggestionItemClick(
        filteredData[activeSuggestion].link,
        e as unknown as ChangeEvent<HTMLInputElement>
      )
      setUserInput(filteredData[activeSuggestion][filterKey])
      setShowSuggestions(false)
    } else {
      return
    }

    // custom Keydown event
    if (props.onKeyDown !== undefined && props.onKeyDown !== null) {
      props.onKeyDown(
        e as unknown as KeyboardEvent<HTMLInputElement>,
        userInput
      )
    }
  }

  const renderGroupedSuggestion = (arr: any) => {
    const { filterKey, customRender } = props

    const renderSuggestion = (item: any, i: number) => {
      if (!customRender) {
        const suggestionURL =
          item.link !== undefined && item.link !== null ? item.link : null
        return (
          <li
            className={classnames('suggestion-item', {
              active: filteredData.indexOf(item) === activeSuggestion
            })}
            key={item[filterKey]}
            onClick={(e) =>
              onSuggestionItemClick(
                suggestionURL,
                e as unknown as ChangeEvent<HTMLInputElement>
              )
            }
            onMouseEnter={() => {
              onSuggestionItemHover(filteredData.indexOf(item))
            }}
          >
            {item[filterKey]}
          </li>
        )
      } else {
        return customRender(
          item,
          i,
          filteredData,
          activeSuggestion,
          onSuggestionItemClick,
          onSuggestionItemHover,
          userInput
        )
      }
    }

    return arr.map((item: any, i: number) => {
      return renderSuggestion(item, i)
    })
  }

  // ** Function To Render Ungrouped Suggestions
  const renderUngroupedSuggestions = () => {
    const { filterKey, suggestions, customRender, suggestionLimit } = props
    filteredData = []

    const sortSingleData = suggestions
      .filter((i) => {
        const startCondition = i[filterKey]
          .toLowerCase()
          .startsWith(userInput.toLowerCase())
        const includeCondition = i[filterKey]
          .toLowerCase()
          .includes(userInput.toLowerCase())
        if (startCondition) {
          return startCondition
        } else if (!startCondition && includeCondition) {
          return includeCondition
        } else {
          return null
        }
      })
      .slice(0, suggestionLimit)
    filteredData.push(...sortSingleData)
    if (sortSingleData.length > 0) {
      return sortSingleData.map((suggestion, index) => {
        const suggestionURL =
          suggestion.link !== undefined && suggestion.link !== null
            ? suggestion.link
            : null
        if (!customRender) {
          return (
            <li
              className={classnames('suggestion-item', {
                active: filteredData.indexOf(suggestion) === activeSuggestion
              })}
              key={suggestion[filterKey]}
              onClick={(e) =>
                onSuggestionItemClick(
                  suggestionURL,
                  e as unknown as ChangeEvent<HTMLInputElement>
                )
              }
              onMouseEnter={() =>
                onSuggestionItemHover(filteredData.indexOf(suggestion))
              }
            >
              {suggestion[filterKey]}
            </li>
          )
        } else if (customRender) {
          return customRender(
            suggestion,
            index,
            filteredData,
            activeSuggestion,
            onSuggestionItemClick,
            onSuggestionItemHover,
            userInput
          )
        } else {
          return null
        }
      })
    } else {
      return (
        <li className="suggestion-item no-result">
          <AlertCircle size={15} />{' '}
          <span className="align-middle ml-50">No Result</span>
        </li>
      )
    }
  }

  // function To Render Suggestions
  const renderSuggestions = () => {
    const { filterKey, grouped, filterHeaderKey, suggestions } = props

    // checks if suggestions are grouped or not
    if (grouped === undefined || grouped === null || !grouped) {
      return renderUngroupedSuggestions()
    } else {
      filteredData = []
      return suggestions.map((suggestion) => {
        const sortData = suggestion.data
          .filter((i: any) => {
            const startCondition = i[filterKey]
              .toLowerCase()
              .startsWith(userInput.toLowerCase())
            const includeCondition = i[filterKey]
              .toLowerCase()
              .includes(userInput.toLowerCase())
            if (startCondition) {
              return startCondition
            } else if (!startCondition && includeCondition) {
              return includeCondition
            } else {
              return null
            }
          })
          .slice(0, suggestion.searchLimit)

        filteredData.push(...sortData)
        return (
          <Fragment key={suggestion[filterHeaderKey ? filterHeaderKey : '']}>
            <li className="suggestion-item suggestion-title-wrapper">
              <h6 className="suggestion-title">
                {suggestion[filterHeaderKey ? filterHeaderKey : '']}
              </h6>
            </li>
            {sortData.length > 0 ? (
              renderGroupedSuggestion(sortData)
            ) : (
              <li className="suggestion-item no-result">
                <AlertCircle size={15} />{' '}
                <span className="align-middle ml-50">No Result</span>
              </li>
            )}
          </Fragment>
        )
      })
    }
  }

  // ComponentDidMount
  useEffect(() => {
    if (props.defaultSuggestions && focused) {
      setShowSuggestions(true)
    }
  }, [])

  // ComponentDidUpdate
  useEffect(() => {
    const textInput = ReactDOM.findDOMNode(inputElRef.current)

    // for searchbar focus
    if (textInput !== null && props.autoFocus && inputElRef.current) {
      inputElRef.current.focus()
    }

    // If user has passed default suggestions & focus then show default suggestions
    if (props.defaultSuggestions && focused) {
      setShowSuggestions(true)
    }

    // function to run on user passed Clear Input
    if (props.clearInput) {
      props.clearInput(userInput, setUserInput)
    }

    // function on Suggestions Shown
    if (props.onSuggestionsShown && showSuggestions) {
      props.onSuggestionsShown(userInput)
    }
  }, [setShowSuggestions, focused, userInput, showSuggestions, props])

  // On External Click Close The Search & Call Passed Function
  useOnClickOutside(container, () => {
    setShowSuggestions(false)
    if (props.externalClick) {
      props.externalClick()
    }
  })

  let suggestionsListComponent
  if (showSuggestions) {
    suggestionsListComponent = (
      <PerfectScrollbar
        className={classnames('suggestions-list', {
          [props.wrapperClass]: props.wrapperClass
        })}
        ref={suggestionsListRef}
        component="ul"
        options={{ wheelPropagation: false }}
      >
        {renderSuggestions()}
      </PerfectScrollbar>
    )
  }

  return (
    <div className="autocomplete-container" ref={container}>
      <input
        type="text"
        onChange={(e) => {
          onChange(e)
          if (props.onChange) {
            props.onChange(e)
          }
        }}
        onKeyDown={(e) => onKeyDown(e)}
        value={userInput}
        className={`autocomplete-search ${
          props.className ? props.className : ''
        }`}
        placeholder={props.placeholder}
        onClick={onInputClick}
        ref={inputElRef}
        onFocus={(e) => setFocused(true)}
        autoFocus={props.autoFocus}
        onBlur={(e) => {
          if (props.onBlur) props.onBlur(e)
          setFocused(false)
        }}
      />
      {suggestionsListComponent}
    </div>
  )
}

export default Autocomplete
