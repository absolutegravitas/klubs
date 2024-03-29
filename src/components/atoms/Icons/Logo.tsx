const Logo = ({ ...props }) => {
  return (
    <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.59375 10.2656L11.0769 12.6857L3 16.5217V7.94203L12 4L21 7.71014V16.5217L12.675 20V11.4203L19 8.85239"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  )
}
export default Logo