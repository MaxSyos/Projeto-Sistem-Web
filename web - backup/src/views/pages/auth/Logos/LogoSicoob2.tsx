// ** React Imports
import { Fragment, ReactNode } from 'react'

// ** MUI Components
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

interface LogoSicoobProp {
    image?: ReactNode
}

// Styled Components
const MaskImg = styled('img')(() => ({
    bottom: 0,
    zIndex: -1,
    width: '100%',
    position: 'absolute'
}))

const LogoImg = styled('img')(({ theme }) => ({
    display: 'flow',
    width: '12%',
    position: 'absolute',

}))

const LogoSicoob2 = (props: LogoSicoobProp) => {
    // ** Props
    const { image } = props

    // ** Hook
    const theme = useTheme()

    // ** Vars
    const hidden = useMediaQuery(theme.breakpoints.only('xl'))

    if (!hidden) {
        return (
            <Fragment>
                {image || <LogoImg alt='logo' src='/sicoobImages/logoSicoob2.webp' />}
            </Fragment>
        )
    } else {
        return null
    }
}

export default LogoSicoob2
