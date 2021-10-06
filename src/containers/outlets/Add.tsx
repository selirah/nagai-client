import { useEffect, useState, Fragment, useCallback } from 'react'
import { useHistory, useParams } from 'react-router'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import outletActions from 'redux/outlets/actions'
import { OutletFields, Territory, OptionKey } from 'classes'
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
import { Coffee } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { components } from 'react-select'
import SelectComponent from 'components/Select'

const { addOutletRequest, clearStates, setActiveLink } = outletActions

const validateSchema = Yup.object().shape({
  ownerName: Yup.string().required('This is a required field'),
  outletName: Yup.string().required('This is a required field'),
  mobile: Yup.string()
    .min(10, 'Phone number is too short!')
    .max(12, 'Phone number is too long!')
    .required('This is a required field'),
  barcode: Yup.string().required('This is a required field'),
  email: Yup.string().email(
    'Please input a valid email in the form john@example.com'
  ),
  locality: Yup.string().required('This is a required field'),
  subLocality: Yup.string().required('This is a required field'),
  coordinates: Yup.object().shape({
    lat: Yup.string().required('This is a required field'),
    lng: Yup.string().required('This is a required field')
  }),
  region: Yup.object().required('This is a required field')
})

type QueryParam = {
  id: string
}

const { Option } = components

const Add = () => {
  const { id } = useParams<QueryParam>()
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.outlets)
  const territoryStore = Selector((state) => state.territories)
  const utilsStore = Selector((state) => state.utils)
  const [values] = useState<OutletFields>({
    barcode: '',
    email: '',
    landmark: '',
    locality: '',
    mobile: '',
    outletName: '',
    ownerName: '',
    subLocality: '',
    telephone: '',
    territoryId: parseInt(id),
    territory: '',
    coordinates: {
      lat: '',
      lng: ''
    },
    region: ''
  })
  const [btnLoading, setBtnLoading] = useState(false)
  const history = useHistory()
  const [err, setErr] = useState(null)
  const [territory, setTerritory] = useState<Territory | null>(null)

  useEffect(() => {
    dispatch(clearStates())
    dispatch(setActiveLink('add'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { isSubmitting, isSucceeded, errors } = store
    const { territory } = territoryStore
    values.territoryId = territory ? territory.id : parseInt(id)
    values.territory = territory ? territory.locality : ''
    setBtnLoading(isSubmitting)
    setErr(errors)
    setTerritory(territory)
    if (isSucceeded) {
      toast.success(
        <ToastBox
          color="success"
          icon={<Coffee />}
          message="Outlet has been added to territory successfully"
          title="Nice!"
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 5000,
          position: 'bottom-right'
        }
      )
      history.push('/admin/outlets')
    }
  }, [store, history, id, territoryStore, values])

  const onSubmit = useCallback(
    (values: OutletFields) => {
      values.region = values.region.value
      dispatch(addOutletRequest(values))
    },
    [dispatch]
  )

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

  const regionOptions: OptionKey[] = []
  utilsStore.regions.map((r) => {
    regionOptions.push({
      value: r.region,
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

  return (
    <Fragment>
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
                    <CardTitle
                      tag="h2"
                      className="font-weight-light text-primary"
                    >
                      Create outlet for {territory ? territory.locality : null}{' '}
                      territory
                    </CardTitle>
                  </Col>
                </Row>
                {err ? renderError(err) : null}
                <Row className="px-3">
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="territory">
                        Territory <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="territory"
                        placeholder=""
                        value={values.territory}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="territory"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="ownerName">
                        Owner name <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="ownerName"
                        placeholder="Enter owner name"
                        value={values.ownerName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="ownerName"
                      />
                      {errors.ownerName && touched.ownerName ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.ownerName}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="outletName">
                        Outlet name <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="outletName"
                        placeholder="Enter outlet name"
                        value={values.outletName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="outletName"
                      />
                      {errors.outletName && touched.outletName ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.outletName}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="px-3">
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="barcode">
                        Barcode <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="barcode"
                        placeholder="Enter barcode of outlet"
                        value={values.barcode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="barcode"
                      />
                      {errors.barcode && touched.barcode ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.barcode}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="mobile">
                        Mobile number
                      </Label>
                      <Input
                        type="text"
                        id="mobile"
                        placeholder="Enter mobile number of outlet"
                        value={values.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="mobile"
                      />
                      {errors.mobile && touched.mobile ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.mobile}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="telephone">
                        Telephone number
                      </Label>
                      <Input
                        type="text"
                        id="telephone"
                        placeholder="Enter telephone number of outlet"
                        value={values.telephone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="telephone"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="px-3">
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="email">
                        Email address
                      </Label>
                      <Input
                        type="text"
                        id="email"
                        placeholder="Enter email address of outlet"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="email"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="locality">
                        Locality <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="locality"
                        placeholder="Enter locality of outlet"
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
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="subLocality">
                        Sub-Locality <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="subLocality"
                        placeholder="Enter sub-locality of outlet"
                        value={values.subLocality}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="subLocality"
                      />
                      {errors.subLocality && touched.subLocality ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.subLocality}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="px-3">
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="latitude">
                        Latitude <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="latitude"
                        placeholder="Enter latitude of outlet"
                        value={values.coordinates.lat}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="coordinates.lat"
                      />
                      {errors.coordinates &&
                      errors.coordinates.lat &&
                      touched.coordinates &&
                      touched.coordinates.lat ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.coordinates.lat}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="longitude">
                        Longitude <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="longitude"
                        placeholder="Enter longitude of outlet"
                        value={values.coordinates.lng}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="coordinates.lng"
                      />
                      {errors.coordinates &&
                      errors.coordinates.lng &&
                      touched.coordinates &&
                      touched.coordinates.lng ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.coordinates.lng}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="region">
                        Region <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <SelectComponent
                        id="region"
                        name="region"
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.region}
                        touched={touched.region}
                        options={rSelectOptions}
                        optionComponent={OptionComponent}
                        value={values.region}
                        placeholder="Select region.."
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="px-3">
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="landmark">
                        Brief description, landmark, area bordered, etc
                      </Label>
                      <Input
                        type="textarea"
                        id="landmark"
                        placeholder="Enter any description to remember about the territory"
                        value={values.landmark}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="landmark"
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
                      <Collapse isOpen={!btnLoading}>Save Outlet</Collapse>
                    </RippleButton>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </PerfectScrollbar>
      </div>
    </Fragment>
  )
}

export default Add
