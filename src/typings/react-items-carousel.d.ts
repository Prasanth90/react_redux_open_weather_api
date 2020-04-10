/**
 * Added the type file for the third party library just to make it compile
 * 
 */

declare module 'react-items-carousel' {
    export interface IProps {
        requestToChangeActive: any
        activeItemIndex: any
        numberOfCards: number
        gutter: number
        leftChevron:any
        rightChevron: any
        outsideChevron: any
        chevronWidth: any
    }

    export default class ItemsCarousel extends React.Component<IProps, {}> {} 
}