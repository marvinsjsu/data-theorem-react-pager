import React from 'react';
import PropTypes from 'prop-types';

import SupportForm from './SupportForm';
import { getPage, sendSupportMessage } from '../../utils/api';

const GO_BACK = 1;
const GO_PREV = -1;

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
    pageIndex: 0,
    pageInfo: {},
    pageInfoIsLoading: true,
    pageInfoError: null,
    showSupportDialog: false,
    sendMessageError: null
  };

  componentDidMount () {
    const { pages, children, getLabel } = this.props;

    if (!children || !pages || !pages[0] || !getLabel) return false;
    this.mounted = true;
    this._loadPageUrl();
  };

  componentWillUnmount () {
    this.mounted = false;
  };

  currentPageLabel = () => {
    const { pageIndex } = this.state;
    const { getLabel } = this.props;
    return getLabel(pageIndex);
  };

  pageLabels = () => {
    const { getLabel, pages } = this.props;
    return pages.map((page, idx) => (getLabel(idx)));
  };

  goPrevious = () => {
    this._movePage(GO_PREV);
  };

  goNext = () => {
    this._movePage(GO_BACK);
  };

  goToLabel = (label) => {
    const pageIndex = this.pageLabels().indexOf(label);

    if (pageIndex !== -1) {
      this.setState({
        pageIndex
      });
    }
  };

  openSupportDialog = () => {
    const { supportRequestUrl } = this.props;

    if (!supportRequestUrl) return false;
    this.setState({
      showSupportDialog: true,
    });
  };

  closeSupportDialog = () => {
    this.setState({
      showSupportDialog: false
    });
  };

  sendMessage = ({ name, email, message }) => {
    if (name && email && message) {
      const { supportRequestUrl } = this.props;

      sendSupportMessage(supportRequestUrl, {
        name,
        email,
        message
      })
        .then((res) => {
          console.log('res: ', res);
        })
        .catch((e) => {
          console.log('error: ', e);

          this.setState({
            sendMessageError: e.message
          });
        });

    }
  };

  _getPageIndex = (step, currIndex, pageCount) => {
    let newPageIndex = currIndex + step;
    let mod = newPageIndex % pageCount;
    return mod > 0 ? mod : Math.abs(pageCount + mod) % pageCount;
  };

  _movePage = (step) => {
    const { pages } = this.props;

    this.setState((currState) => {
      const newPageIndex = this._getPageIndex(step, currState.pageIndex, pages.length);
      const newPage = pages[newPageIndex];
      return {
        pageIndex: newPageIndex,
        page: newPage
      }
    }, this._loadPageUrl);
  };

  _loadPageUrl = () => {
    const { pageInfoUrl } = this.props;
    const pageLabel = this.currentPageLabel();

    if (pageInfoUrl && pageLabel) {
      getPage(pageInfoUrl(pageLabel))
        .then((pageInfo) => {


console.log('pageInfo: ', pageInfo);

          if (this.mounted && pageInfo) {
            this.setState({
              pageInfo,
              pageInfoIsLoading: true
            });
          }
        })
        .catch((error) => {


console.log('error: ', error);


          if (this.mounted) {
            this.setState({
              pageInfoError: error
            });
          }
        });
    }
  };

  render () {
    const { showSupportDialog, pageIndex } = this.state;
    const { children: Component, supportRequestUrl, pages } = this.props;
    const page = pages[pageIndex];

    return (
      <React.Fragment>
        <Component
          {...this.state}
          page={page}
          goNext={this.goNext}
          goPrevious={this.goPrevious}
          goToLabel={this.goToLabel}
          openSupportDialog={this.openSupportDialog}
          pageLabels={this.pageLabels()}
          currentPageLabel={this.currentPageLabel()}
        />
        {showSupportDialog && (
          <SupportForm
            supportRequestUrl={supportRequestUrl}
            sendMessage={this.sendMessage}
            closeSupportDialog={this.closeSupportDialog}
          />
        )}
      </React.Fragment>
    );
  }
}