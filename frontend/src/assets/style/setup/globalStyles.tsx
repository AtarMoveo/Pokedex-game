import { createGlobalStyle } from 'styled-components';
import mulishRegular from '../../style/fonts/mulish/Mulish-Regular.ttf';
import mulishMedium from '../../style/fonts/mulish/Mulish-Medium.ttf';
import mulishBold from '../../style/fonts/mulish/Mulish-Bold.ttf';
import robotoRegular from '../../style/fonts/roboto/Roboto-Regular.ttf';
import robotoBold from '../../style/fonts/roboto/Roboto-Bold.ttf';

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'MuilshRegular';
        src: url(${mulishRegular}) format('truetype');
    }
    @font-face {
        font-family: 'MuilshMedium';
        src: url(${mulishMedium}) format('truetype');
    }
    @font-face {
        font-family: 'MuilshBold';
        src: url(${mulishBold}) format('truetype');
    }
    @font-face {
        font-family: 'RobotoRegular';
        src: url(${robotoRegular}) format('truetype');
    }
    @font-face {
        font-family: 'RobotoBold';
        src: url(${robotoBold}) format('truetype');
    }
`