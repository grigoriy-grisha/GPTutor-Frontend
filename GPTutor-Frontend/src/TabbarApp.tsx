import classes from "$/panels/Home/Home.module.css";
import {
  Platform,
  Separator,
  Tabbar,
  TabbarItem,
  usePlatform,
  View,
} from "@vkontakte/vkui";
import {
  Icon20PictureStack,
  Icon20User,
  Icon24MagicWandOutline,
  Icon28BookSpreadOutline,
  Icon28HistoryBackwardOutline,
} from "@vkontakte/icons";
import React from "react";
import { useNavigationContext } from "$/NavigationContext";
import { appService } from "$/services/AppService";
import { useLocation, useRouter } from "@happysanta/router";
import { Panels, Views } from "$/entity/routing";

interface IProps {
  setRef: (ref: HTMLDivElement) => void;
}

function TabbarApp({ setRef }: IProps) {
  const { goToModes, goToHistory, goToGallery, goToOpenProfile } =
    useNavigationContext();

  const platform = usePlatform();
  const location = useLocation();

  console.log(location.state.history);

  const activePanel = location.getViewActivePanel(Views.viewMain);

  if (appService.isStableArt()) {
    return (
      <Tabbar
        className={classes.tabBar}
        mode={platform === Platform.VKCOM ? "horizontal" : "vertical"}
      >
        <Separator wide style={{ width: "100%" }} />
        <div
          ref={setRef}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <TabbarItem
            selected={activePanel === Panels.profile}
            className={classes.tabItem}
            text="Профиль"
            onClick={goToOpenProfile}
          >
            <Icon20User width={28} height={28} />
          </TabbarItem>
          <TabbarItem
            selected={activePanel === Panels.gallery}
            className={classes.tabItem}
            text="Коллекция"
            onClick={goToGallery}
          >
            <Icon20PictureStack width={28} height={28} />
          </TabbarItem>
        </div>
      </Tabbar>
    );
  }

  return (
    <Tabbar
      className={classes.tabBar}
      mode={platform === Platform.VKCOM ? "horizontal" : "vertical"}
    >
      <Separator wide style={{ width: "100%" }} />
      <div
        ref={setRef}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <TabbarItem
          className={classes.tabItem}
          text="Режимы"
          onClick={goToModes}
        >
          <Icon28BookSpreadOutline />
        </TabbarItem>
        <TabbarItem
          className={classes.tabItem}
          text="История диалогов"
          onClick={goToHistory}
        >
          <Icon28HistoryBackwardOutline />
        </TabbarItem>
      </div>
    </Tabbar>
  );
}

export default TabbarApp;
