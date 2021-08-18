import { useEffect, useState, Fragment, useCallback } from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import stockActions from 'redux/stock/actions'
import { StockFields } from 'classes'
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
  CardTitle
} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { Coffee, AlertTriangle } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { components } from 'react-select'
import SelectComponent from 'components/Select'

const { addStockRequest, clearStates, setActiveLink } = stockActions

const { Option } = components

const validateSchema = Yup.object().shape({
  sku: Yup.string().required('This is a required field'),
  unit: Yup.object().required('This is a required field'),
  unitPrice: Yup.number().required('This is a required field'),
  quantityPurchased: Yup.number().required('This is a required field'),
  reorderLevel: Yup.number().required('This is a required field'),
  reorderQuantity: Yup.number().required('This is a required field'),
  reorderDate: Yup.date().required('This is a required field')
})

const Add = () => {
  return <div>Add</div>
}

export default Add
