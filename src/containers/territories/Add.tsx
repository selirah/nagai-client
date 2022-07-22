import { useEffect, useState, useCallback } from 'react'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import territoryActions from '@redux/terrirtories/actions'
import { TerritoryFields, OptionKey } from '@classes/index'
import { toast, Slide } from 'react-toastify'
import RippleButton from '@core/components/ripple-button'
import ToastBox from '@components/ToastBox'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  Collapse,
  Row,
  Col,
  CardTitle,
  Alert
} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { Coffee } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { components } from 'react-select'
import SelectComponent from '@components/Select'

const { addTerritoryRequest, clearStates, setActiveLink } = territoryActions

const { Option } = components

const validateSchema = Yup.object().shape({
  locality: Yup.string().required('This is a required field'),
  regionId: Yup.object().required('This is a required field')
})

interface Fields {
  locality: string
  regionId: any
  description: string
}

const Add = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.territories)
  const utils = Selector((state) => state.utils)
  const [values] = useState<Fields>({
    regionId: '',
    locality: '',
    description: ''
  })
  const [btnLoading, setBtnLoading] = useState(false)
  const history = useHistory()
  const [err, setErr] = useState(null)

  const onSubmit = useCallback(
    (values: Fields) => {
      const payload: TerritoryFields = {
        regionId: parseInt(values.regionId.value),
        locality: values.locality,
        description: values.description
      }
      dispatch(addTerritoryRequest(payload))
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(clearStates())
    dispatch(setActiveLink('add'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { isSubmitting, isSucceeded, errors } = store
    setBtnLoading(isSubmitting)
    setErr(errors)
    if (isSucceeded) {
      toast.success(
        <ToastBox
          color="success"
          icon={<Coffee />}
          message="Territory has been created successfully"
          title="Nice!"
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 5000,
          position: 'bottom-right'
        }
      )
      history.push('/admin/territories')
    }
  }, [store, history])

  const regionOptions: OptionKey[] = []
  utils.regions.map((r) => {
    regionOptions.push({
      value: `${r.id}`,
      label: r.region
    })
    return regionOptions
  })

  const rSelectOptions = [
    {
      label: 'Select Region of Territory',
      options: regionOptions
    }
  ]

  const OptionComponent = ({ data, ...props }: any) => {
    return (
      <Option {...props}>
        <div className="d-flex justify-content-start align-items-center">
          <div className="profile-user-info">{data.label}</div>
        </div>
      </Option>
    )
  }

  const renderError = (errors: any) => (
    <Row className="px-3">
      <Col sm="12" md="12" lg="12">
        <Alert color="danger" className="p-2">
          <small className="font-weight-bolder">
            {errors.errors[0].message}
          </small>
        </Alert>
      </Col>
    </Row>
  )

  return (
    <div className="list-group todo-task-list-wrapper">
      <PerfectScrollbar
        options={{ wheelPropagation: false }}
        containerRef={(ref: any) => {
          if (ref) {
            ref._getBoundingClientRect = ref.getBoundingClientRect
            ref.getBoundingClientRect = () => {
              const original = ref._getBoundingClientRect()

              return { ...original, height: Math.floor(original.height) }
            }
          }
        }}
      >
        <Formik
          initialValues={values}
          onSubmit={(values) => onSubmit(values)}
          validationSchema={validateSchema}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setFieldTouched
          }) => (
            <Form className="mt-2" onSubmit={handleSubmit}>
              <Row className="px-3">
                <Col sm="12" md="12" lg="12">
                  <CardTitle tag="h2" className="font-weight-light">
                    Create a Territory
                  </CardTitle>
                </Col>
              </Row>
              {err ? renderError(err) : null}
              <Row className="px-3">
                <Col sm="12" md="6" lg="6">
                  <FormGroup>
                    <Label className="form-label" for="locality">
                      Locality <span style={{ color: '#ff0000' }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      id="locality"
                      placeholder="Enter locality of territory"
                      value={values.locality}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="locality"
                    />
                    {errors.locality && touched.locality ? (
                      <small style={{ color: '#ff0000' }}>
                        {errors.locality}
                      </small>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col sm="12" md="6" lg="6">
                  <FormGroup>
                    <Label className="form-label" for="regionId">
                      Region <span style={{ color: '#ff0000' }}>*</span>
                    </Label>
                    <SelectComponent
                      id="regionId"
                      name="regionId"
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      error={errors.regionId}
                      touched={touched.regionId}
                      options={rSelectOptions}
                      optionComponent={OptionComponent}
                      value={values.regionId}
                      placeholder="Select region.."
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="px-3">
                <Col sm="12" md="6" lg="6">
                  <FormGroup>
                    <Label className="form-label" for="description">
                      Brief description, landmark, area bordered, etc
                    </Label>
                    <Input
                      type="textarea"
                      id="description"
                      placeholder="Enter any description to remember about the territory"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="description"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="px-3 mb-2">
                <Col sm="4" md="4" lg="4">
                  <RippleButton type="submit" color="primary" block>
                    <Collapse isOpen={btnLoading}>
                      <Spinner color="white" className="mr-2" size="sm" />{' '}
                      Saving . . .
                    </Collapse>
                    <Collapse isOpen={!btnLoading}>Save Territory</Collapse>
                  </RippleButton>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </PerfectScrollbar>
    </div>
  )
}

export default Add
