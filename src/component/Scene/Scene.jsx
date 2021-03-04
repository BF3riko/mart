import React, { Component } from 'react';
import Winwheel from '../Winwheel';

import Style from "./css/style.module.css";

class Scene extends Component {
    state = {}

    render() {

        return (
            <div className={Style.scene}>
                <Winwheel />
            </div>
        )
    }
}

export default Scene;