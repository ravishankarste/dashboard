import React, { useState } from "react";
import { Container, Row, Col } from "shards-react";

import { MainNavbar } from "../components/Layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/Layout/MainSidebar/MainSidebar";
import MainFooter from "../components/Layout/MainFooter";
import { CookiesBanner } from "../components/Common/CookiesBanner";
import { InfoToast } from "../components/Common/InfoToast";
import { ConnectionToast } from "../components/Common/ConnectionToast";

import PasteYAML from "../modals/PasteYAML";
import WriteReview from "../modals/WriteReview";
import LogDetails from "../modals/LogDetails";

import logger from "../logger";

import { Dispatcher, Constants } from "../flux";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBanner,
  selectConnectionStatus,
  selectLoading,
  selectMenuState,
  selectModal,
  selectModalParams,
  selectSidebarItems,
  selectUser,
} from "../redux/global/global.selectors";
import store from "../redux";
import { showBanner, toggleSidebar } from "../redux/global/global.actions";

type IconSideBarLayoutProps = {
  children: React.ReactNode;
  usesAuth: boolean;
  usesConnection: boolean;
};

const IconSidebarLayout = (props: IconSideBarLayoutProps) => {
  const modal = useSelector(selectModal);
  const modalParams = useSelector(selectModalParams);
  const loading = useSelector(selectLoading);
  const banner = useSelector(selectBanner);
  const connected = useSelector(selectConnectionStatus);
  const loggerEnabled = logger.isEnabled();
  const menuVisible = useSelector(selectMenuState);
  const sidebarNavItems = useSelector(selectSidebarItems);
  const user = useSelector(selectUser);
  const [acceptedCookies, setAcceptedCookies] = useState<boolean>(
    localStorage.getItem("accepted-cookies") === "true"
  );

  const dispatch = useDispatch();
  const acceptCookies = () => {
    localStorage.setItem("accepted-cookies", String(true));
    setAcceptedCookies(true);
  };

  const closeModal = () => {
    dispatch(closeModal());
  };

  const importYAML = (yamlString: string) => {
    Dispatcher.dispatch({
      actionType: Constants.IMPORT_CUSTOM_YAML,
      payload: yamlString,
    });
  };

  const submitReview = (content: any) => {
    if (modalParams) {
      const { imageId } = modalParams;
      Dispatcher.dispatch({
        actionType: Constants.POST_REVIEW,
        payload: { content, imageId },
      });
    }
  };

  const reconnect = () => {
    Dispatcher.dispatch({
      actionType: Constants.RECONNECT,
    });
  };

  const logOut = () => {
    Dispatcher.dispatch({
      actionType: Constants.LOG_OUT,
    });
  };

  const _toggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const enableLogger = () => {
    logger.enable();
    const storeCopy = store.getState();
    logger.log("Store Snapshot", storeCopy);
    dispatch(
      showBanner(
        'Debug Mode Enabled. Click "Export Debug Data" to download Debug JSON.',
        "warning"
      )
    );
  };

  const disableLogger = () => {
    logger.disable();
    dispatch(showBanner("Debug Mode Disabled.", "warning"));
  };

  const exportLogs = () => {
    const storeCopy = store.getState();
    logger.log("Store Snapshot", storeCopy);
    logger.exportLogs();
  };

  const { children, usesAuth, usesConnection } = props;
  return (
    <Container fluid className="icon-sidebar-nav">
      <Row>
        <MainSidebar
          sidebarNavItems={sidebarNavItems}
          menuVisible={menuVisible}
          toggleSidebar={_toggleSidebar}
        />
        <Col className="main-content col" tag="main">
          <MainNavbar
            user={user}
            usesAuth={usesAuth}
            usesConnection={usesConnection}
            logOut={logOut}
            toggleSidebar={_toggleSidebar}
            reconnect={reconnect}
            connected={connected}
          />
          <InfoToast data={banner} />
          {usesConnection && !loading && !connected && (
            <ConnectionToast reconnect={reconnect} />
          )}
          {children}
          {!acceptedCookies && <CookiesBanner acceptCookies={acceptCookies} />}
          <MainFooter
            loggerEnabled={loggerEnabled}
            enableLogger={enableLogger}
            disableLogger={disableLogger}
            exportLogs={exportLogs}
          />
        </Col>
      </Row>
      <LogDetails
        open={modal === "logDetails"}
        closeModal={closeModal}
        modalParams={modalParams}
      />
      <PasteYAML
        open={modal === "import"}
        closeModal={closeModal}
        importYAML={importYAML}
      />
      <WriteReview
        open={modal === "review"}
        closeModal={closeModal}
        submitReview={submitReview}
      />
    </Container>
  );
};

export default IconSidebarLayout;
