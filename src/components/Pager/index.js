import React from 'react';
import PropTypes from 'prop-types';

export default class Pager extends React.Component {

  static propTypes = {
    pages: PropTypes.array.isRequired,
    getLabel: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    supportRequestUrl: PropTypes.string,
    pageInfoUrl: PropTypes.string
  };

  static defaultProps = {
    supportRequestUrl: null,
    pageInfoUrl: null
  };

  state = {
    initialized: false,
    page: this.props.pages[0],
    pages: this.props.pages,
    getLabel: this.props.getLabel,
    pageIndex: 0,
    pageInfoIsLoading: true,
    pageInfoError: null,

    currentPageLabel: (() => {
      const { pageIndex } = this.state;
      return this.getLabel(pageIndex);
    })(),
    pageLabels: (() => {
      const { pages } = this.state;
      return pages.map((page, idx) => (this.getLabel(idx)));
    })(),


    goPrevious: () => {
      this.setState((currState) => ({
        pageIndex: this._getPageIndex(1, currState.pageIndex, currState.pages.length)
      }));
    },

    goNext: () => {
      this.setState((currState) => ({
        pageIndex: this._getPageIndex(-1, currState.pageIndex, currState.pages.length)
      }));
    },

    goToLabel: () => {

    },

    openSupportDialog: () => {

    },

    _getPageIndex: (step, currIndex, pageCount) => {
      let newPageIndex = currIndex + step;
      let mod = newPageIndex % pageCount;
      return mod > 0 ? mod : Math.abs(pageCount + mod) % pageCount;
    }
  };

  componentDidMount () {
    const { children } = this.props;

    if (!children) {
      return false;
    }
  }

  render () {
    const { children: Component } = this.props;

    return (
      <Component {...this.state} />
    );
  }
}