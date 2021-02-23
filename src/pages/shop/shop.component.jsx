import React from 'react';
import { Route } from 'react-router-dom';
import CollectionsOverView from '../../components/collections-overview/collections-overview.component.jsx';
import CollectionPage from '../collection/collection.component';
import './shop.styles.scss';

const ShopPage = ({ match }) => (
    <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverView} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
);
    



export default ShopPage;