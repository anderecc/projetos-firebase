import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../../styles/map/map.module.sass';
import renderMap from '@/functions/renderMap';

const Map = (props) => {
    const map = useSelector((state) => state.map);
    const context = useSelector((state) => state.context);
    const dispatch = useDispatch();

    useEffect(() => {
        renderMap(map.position);
    }, [context.mapVisible]);

    return (
        <div className={styles.map}>
            <button
                className={styles.btn_close}
                onClick={() => dispatch(props.setMapVisible(false))}
            >
                <i className="fa-solid fa-xmark"></i>
            </button>
            <div id="mapVisible" style={{ width: '100%', height: '70%' }}></div>
        </div>
    );
};

export default Map;
