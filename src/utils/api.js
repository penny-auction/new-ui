import fetch from 'isomorphic-unfetch';

const rootPath = "http://api.penny-auction.cf";
const token = localStorage.getItem('penny-auction-token');

export const fetchLotsOfUser = () => {
    return fetch(rootPath  + '/self/lots', {
        mode: 'cors',
        headers: {
            "Access-Token": token
        }
    }).then((res) => res.json());
};

export const fetchLots = () => {
    return fetch(rootPath  + '/lots', {
        mode: 'cors',
        headers: {
            "Access-Token": token
        }
    }).then((res) => res.json());
};
export const postLot = ( product_name, start_price, product_desc, category_id, photo) => {
    return fetch(rootPath  + '/lots', {
        method: 'POST',
        body: JSON.stringify({
            product_name: product_name,
            start_price: start_price,
            product_description: product_desc,
            category_id: category_id,
            photo: photo
        }),
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Token": token
        }
    }).then((response) => response.json())
};

export const postBid = (id, txid) => {
    return fetch(rootPath  + '/lots/' + id + '/bids', {
        method: 'POST',

        body: JSON.stringify({
            txid: txid
        }),
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Token": token
        }
    }).then((response) => response.json())
};

export const fetchLot = (id) => {
    return fetch(rootPath  + '/lots/' + id, {
        mode: 'cors',
        headers: {
            "Access-Token": token
        }
    }).then((res) => res.json());
};

export const fetchLotBids = (id) => {
    return fetch(rootPath  + '/lots/' + id + '/bids', {
        mode: 'cors',
        headers: {
            "Access-Token": token
        }
    }).then((res) => res.json());
};
