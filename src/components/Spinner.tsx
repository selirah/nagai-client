import { SpinnerWrapper } from './Style'

const Spinner = () => (
  <SpinnerWrapper>
    <svg className="spinnerContentLoader" viewBox="0 0 50 50">
      <circle
        className="spinnerContentLoaderCircle"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="3.0"
      />
    </svg>
  </SpinnerWrapper>
)

export default Spinner
