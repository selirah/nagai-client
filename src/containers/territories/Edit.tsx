import { useEffect, useState, useCallback } from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import territoryActions from 'redux/terrirtories/actions'
import { TerritoryFields, OptionKey } from 'classes'
import { toast, Slide } from 'react-toastify'
import RippleButton from 'core/components/ripple-button'
import ToastBox from 'components/ToastBox'
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
import { useHistory, useParams } from 'react-router-dom'
import { Coffee } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { components } from 'react-select'
import SelectComponent from 'components/Select'

const { updateTerritoryRequest, clearStates, setActiveLink } = territoryActions

const { Option } = components

interface Fields {
  locality: string
  regionId: any
  lat: string
  lng: string
  description: string
}

type QueryParam = {
  id: string
}

const validateSchema = Yup.object().shape({
  locality: Yup.string()
    .min(2, 'Locality is too short!')
    .required('This is a required field'),
  regionId: Yup.object().required('This is a required field'),
  lat: Yup.string().required('This is a required field'),
  lng: Yup.string().required('This is a required field')
})

const Edit = () => {
  const dispatch: Dispatch = useDispatch()
  const { id } = useParams<QueryParam>()
  const store = Selector((state) => state.territories)
  const [btnLoading, setBtnLoading] = useState(false)
  const history = useHistory()
  const [err, setErr] = useState(null)
  const [values] = useState(() => {
    const { territories } = store
    const item = territories.find((t) => t.id === parseInt(id))
    const payload: Fields = {
      locality: item ? item.locality : '',
      regionId: item
        ? { label: item.region.region, value: item.region.id }
        : '',
      lat: item ? `${item.coordinates.lat}` : '',
      lng: item ? `${item.coordinates.lng}` : '',
      description: item ? item.description : ''
    }
    return payload
  })

  useEffect(() => {
    dispatch(clearStates())
    dispatch(setActiveLink('edit'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = useCallback(
    (values: Fields) => {
      const payload: TerritoryFields = {
        regionId: parseInt(values.regionId.value),
        locality: values.locality,
        coordinates: {
          lat: parseFloat(values.lat),
          lng: parseFloat(values.lng)
        },
        id: parseInt(id),
        description: values.description
      }
      dispatch(updateTerritoryRequest(payload))
    },
    [dispatch, id]
  )

  useEffect(() => {
    const { isSubmitting, isSucceeded, errors } = store
    setBtnLoading(isSubmitting)
    setErr(errors)
    if (isSucceeded) {
      toast.success(
        <ToastBox
          color="success"
          icon={<Coffee />}
          message="Territory has been updated successfully"
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
  store.regions.map((r) => {
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
                    Update {values ? values.locality : null}
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
                    <Label className="form-label" for="latitude">
                      Latitude <span style={{ color: '#ff0000' }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      id="latitude"
                      placeholder="Enter Latitude of territory"
                      value={values.lat}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="lat"
                    />
                    {errors.lat && touched.lat ? (
                      <small style={{ color: '#ff0000' }}>{errors.lat}</small>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col sm="12" md="6" lg="6">
                  <FormGroup>
                    <Label className="form-label" for="longitude">
                      Longitude <span style={{ color: '#ff0000' }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      id="longitude"
                      placeholder="Enter Longitude of territory"
                      value={values.lng}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="lng"
                    />
                    {errors.lng && touched.lng ? (
                      <small style={{ color: '#ff0000' }}>{errors.lng}</small>
                    ) : null}
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
                    <Collapse isOpen={!btnLoading}>Update Territory</Collapse>
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

export default Edit
