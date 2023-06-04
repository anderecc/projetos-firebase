/* eslint-disable no-undef */
import axios from 'axios';
import { MAP_GET_POSITION, MAP_SET_ADDRESS } from '../types';
import { contextSetLoading, contextSetMap } from './contextActions';
import { messagesSetErrorMap } from './messagesActions';

export const mapSetAddress = (address) => (dispatch) => {
    dispatch({ type: MAP_SET_ADDRESS, payload: address });
};

export const mapGetPosition = (address) => (dispatch) => {
    dispatch(contextSetLoading(true));
    const regex = /,/i;
    let string = address.replace(regex, '%2C');
    string = string.split(' ');
    string = string.join('%20');
    const addressURI = `${string}%2CBento%20Gonçalves`;
    axios
        .get(
            `https://geocode.search.hereapi.com/v1/geocode?q=${addressURI}&apiKey=${process.env.NEXT_PUBLIC_HERE_KEY}`
        )
        .then(async (res) => {
            await dispatch({
                type: MAP_GET_POSITION,
                payload: res.data.items[0].position,
            });
            await dispatch(contextSetMap(true));
            dispatch(contextSetLoading(false));
        })
        .catch((error) => {
            dispatch(contextSetLoading(false));
            dispatch(messagesSetErrorMap(error));
        });
};

export const mapGetLocation = (values) => (dispatch) => {
    const { lat, lng } = values;
    axios
        .get(
            `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${lng}&limit=1&apiKey=${process.env.NEXT_PUBLIC_HERE_KEY}`
        )
        .then((res) => {
            const title = res.data?.items[0]?.title ?? '';
            const titleToArr = title.split(',');
            const titleResult = `${titleToArr[0] ?? ''},${titleToArr[1] ?? ''}`;
            dispatch(mapSetAddress(titleResult));
        })
        .catch((error) => {
            dispatch(messagesSetErrorMap(error));
        });
};
