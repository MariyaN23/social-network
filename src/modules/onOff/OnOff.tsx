import React from 'react';

type OnOffPropsType = {
    selected: boolean
}

export const OnOff = (props: OnOffPropsType) => {
        if (props.selected) {
            return  (<div>
                <span><b>On</b></span>
            <span>Off</span>
            </div>
            )
        } else {
            return  (<div>
                    <span>On</span>
                    <span><b>Off</b></span>
                </div>
            )
        }
}

