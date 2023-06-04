import addressInMap from '@/functions/addressInMap';
import { mapGetLocation } from '@/store/actions/mapActions';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const AddressInMap = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        addressInMap(dispatch, mapGetLocation);
    }, []);

    return (
        <div id="addressInMap" style={{ height: '100%', width: '100%' }}></div>
    );
};

export default AddressInMap;
