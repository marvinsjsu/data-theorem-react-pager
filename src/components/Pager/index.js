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
    page: this.props.pages[0],
    pages: this.props.pages,
    pageIndex: 0,
    pageInfo: {},
    pageInfoIsLoading: true,
    pageInfoError: null,
    showSupportDialog: false,
    sendMessageError: null
  };

  componentDidMount () {
    const { pages, children, getLabel } = this.props;

    if (!children || !pages || !getLabel) return false;
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
    const { pages } = this.state;
    const { getLabel } = this.props;

    return pages.map((page, idx) => (getLabel(idx)));
  };

  goPrevious = () => {
    this._movePage(GO_PREV);
  };

  goNext = () => {
    this._movePage(GO_BACK);
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

debugger;
    const { supportRequestUrl } = this.props;

console.log("OPENSUPPORTDIALOG");

    if (!supportRequestUrl) return false;
    this.setState((currState) => ({
      showSupportDialog: !currState.showSupportDialog
    }));
  };

  sendSupportMessage = ({ name, email, message }) => {
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
    this.setState((currState) => {
      const newPageIndex = this._getPageIndex(step, currState.pageIndex, currState.pages.length);
      const newPage = currState.pages[newPageIndex];
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
    const { showSupportDialog } = this.state;
    const { children: Component, supportRequestUrl } = this.props;

    return (
      <React.Fragment>
        <Component
          {...this.state}
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
            sendSupporMessage={this.sendSupporMessage}
          />
        )}
      </React.Fragment>
    );
  }
}