import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchDataIfNeeded } from './actions'

class FetchData extends Component {

    componentDidMount() {
        const { dispatch, query, namespace } = this.props
        dispatch(fetchDataIfNeeded(namespace, query))
    }

    componentDidUpdate(prevProps) {
        if (this.props.query !== prevProps.query) {
            const { dispatch, query, namespace } = this.props
            dispatch(fetchDataIfNeeded(namespace, query))
        }
    }

    render() {
        const { data, isFetching } = this.props

        return (
            <div className="clearfix">
                {isFetching && data === null &&
                    <h2>Loading...</h2>
                }
                {!isFetching && data === null &&
                    <h2>Empty.</h2>
                }
                {!isFetching && data !== null &&
                    React.Children.map(this.props.children, (child) => React.cloneElement(child, { data, isFetching }))
                }
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { query, namespace } = ownProps || {
        query: ''
    }

    const { isFetching, data } = state[namespace] || {
        isFetching: false,
        data: null
    }

    return { query, data, isFetching }
}

export default connect(mapStateToProps)(FetchData)
