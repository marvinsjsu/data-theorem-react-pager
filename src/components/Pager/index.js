import React from 'react';
import PropTypes from 'prop-types';

export default class Pager extends React.Component {

  static propTypes = {
    pages: PropTypes.array.isRequired,
    getLabel: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    supportRequestUrl: PropTypes.string,
    pageInfoUrl: PropTypes.func
  };

  static defaultProps = {
    supportRequestUrl: null,
    pageInfoUrl: null
  };

  state = {
    initialized: false,
    page: this.props.pages[0],
    pages: this.props.pages,
    pageIndex: 0,
    pageInfo: {},
    pageInfoIsLoading: true,
    pageInfoError: null
  };

  currentPageLabel = () => {
    const { pageIndex } = this.state;
    const { getLabel } = this.props;
    return getLabel(pageIndex);
  };

  pageLabels = () => {
    const { pages } = this.state;
    const { getLabel } = this.props;

    return pages.map((page, idx) => (getLabel(idx)));
  };

  goPrevious = () => {
    this.setState((currState) => {
      const newPageIndex = this._getPageIndex(1, currState.pageIndex, currState.pages.length);
      const newPage = currState.pages[newPageIndex];
      return {
        pageIndex: newPageIndex,
        page: newPage
      }
    });
  };

  goNext = () => {
    this.setState((currState) => {
      const newPageIndex = this._getPageIndex(-1, currState.pageIndex, currState.pages.length);
      const newPage = currState.pages[newPageIndex];
      return {
        pageIndex: newPageIndex,
        page: newPage
      }
    });
  };

  goToLabel = (label) => {
    const { pages } = this.state;
    const pageIndex = this.pageLabels().indexOf(label);
    const page = pages[pageIndex];

    if (pageIndex !== -1) {
      this.setState({
        pageIndex,
        page
      });
    }
  };

  openSupportDialog = () => {

  };

  _getPageIndex = (step, currIndex, pageCount) => {
    let newPageIndex = currIndex + step;
    let mod = newPageIndex % pageCount;
    return mod > 0 ? mod : Math.abs(pageCount + mod) % pageCount;
  };

  componentDidMount () {
    const { children } = this.props;

    if (!children) {
      return false;
    }
  };

  render () {
    const { children: Component } = this.props;

    return (
      <Component
        {...this.state}
        goNext={this.goNext}
        goPrevious={this.goPrevious}
        goToLabel={this.goToLabel}
        openSupportDialog={this.openSupportDialog}
        pageLabels={this.pageLabels()}
        currentPageLabel={this.currentPageLabel()}
      />
    );
  }
}