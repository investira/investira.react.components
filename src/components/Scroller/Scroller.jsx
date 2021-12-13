import React, { PureComponent } from 'react';
import Style from './Scroller.module.scss';
import { browsers } from 'investira.react.lib';
//import classNames from 'classnames';

export class Scroller extends PureComponent {
    constructor(props) {
        super(props);

        this.scrollTimer = null;
        this.lastScrollY = null;
        this.scrollRef = React.createRef();
    }

    // Teste contra freezing scroll no ios
    handleScroll = pEvent => {
        if (browsers.isIOS()) {
            const xScrolledElem = pEvent.target;
            clearTimeout(this.scrollTimer);
            this.scrollTimer = setTimeout(() => {
                xScrolledElem.scrollTop = Math.max(
                    1,
                    Math.min(
                        xScrolledElem.scrollTop,
                        xScrolledElem.scrollHeight -
                            xScrolledElem.clientHeight -
                            1
                    )
                );
                this.lastScrollY = xScrolledElem.scrollTop;
            }, 300);
        }
    };

    handleTouchStart = pEvent => {
        this.forceScroll(pEvent, this.lastScrollY);
    };

    handleTouchEnd = pEvent => {};

    forceScroll = (pEvent, pLastY) => {
        if (browsers.isIOS()) {
            const xCurrentTarget = pEvent.target;
            xCurrentTarget.scrollTop = pLastY - 1;
        }
    };

    render() {
        return (
            <section
                id={this.props.id}
                ref={this.scrollRef}
                className={Style.root}
                onScroll={this.handleScroll}
                onTouchStart={this.handleTouchStart}
                onTouchEnd={this.handleTouchEnd}>
                {this.props.children}
            </section>
        );
    }
}

export default Scroller;
