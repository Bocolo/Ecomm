import React from 'react';
import { Route } from 'react-router-dom';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.component.jsx';
import CollectionPageContainer from '../collection/collection.container';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import { connect } from 'react-redux';

import './shop.styles.scss';

/*const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverView);*/
/*const CollectionPageWithSpinner = WithSpinner(CollectionPage);*/

class ShopPage extends React.Component { 
 
    componentDidMount() {


        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();

    }

    render() {
        const { match} = this.props;
       
        return(
            <div className='shop-page'>
                <Route exact path={`${match.path}`}
                    component={CollectionsOverviewContainer} 
                />
                <Route path={`${match.path}/:collectionId`}
                    component={CollectionPageContainer}
                    
                        />
        </div>
        );
    }
};


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});


export default connect(null, mapDispatchToProps)(ShopPage);