// ** React Imports
import { Fragment, ReactNode } from 'react'

// ** MUI Components
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

interface BackgroundSicoobProp {
  image?: ReactNode
}

// Styled Components
const MaskImg = styled('img')(() => ({
  bottom: 0,
  zIndex: -1,
  width: '100%',
  position: 'absolute'
}))

const BackgroundImg = styled('img')(({ theme }) => ({
  display: 'flex',
  width: '150%',
  position: 'absolute',
  backgroundSize: 'cover',

  [theme.breakpoints.down('md')]: {
    display: 'flex',
    position: 'fixed',
    width: '400%',
  }
}))

const BackgroundSicoob = (props: BackgroundSicoobProp) => {
  // ** Props
  const { image } = props

  // ** Hook
  const theme = useTheme()

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('xs'))

  if (!hidden) {
    return (
      <Fragment>
        {image || <BackgroundImg alt='Background' src='/sicoobImages/SicoobBackgorund.jpg' />}
        <MaskImg alt='mask' src={`/images/pages/misc-mask-${theme.palette.mode}.png`} />
      </Fragment>
    )
  } else {
    return null
  }
}

export default BackgroundSicoob
