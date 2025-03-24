import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonButton,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  BookOpenIcon,
  UserIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/outline";

import Tab1 from "./pages/Tab1";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CoursePage from "./pages/CoursePage";
import CourseExamination from "./pages/CourseExamination";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Dark mode */
import "@ionic/react/css/palettes/dark.class.css";

/* Theme variables */
import "./theme/variables.css";
import { useEffect, useState } from "react";

setupIonicReact();

const App: React.FC = () => {
  const [paletteToggle, setPaletteToggle] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toggleDarkPalette = (shouldAdd: boolean) => {
    document.documentElement.classList.toggle("ion-palette-dark", shouldAdd);
    document.documentElement.setAttribute(
      "data-theme",
      shouldAdd ? "dark" : "light"
    );
  };

  const toggleChange = () => {
    const isDark = !paletteToggle;
    setPaletteToggle(isDark);
    localStorage.setItem("darkMode", isDark.toString());
    toggleDarkPalette(isDark);
  };

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const storedTheme = localStorage.getItem("darkMode");

    if (storedTheme !== null) {
      toggleDarkPalette(storedTheme === "true");
      setPaletteToggle(storedTheme === "true");
    } else {
      toggleDarkPalette(prefersDark.matches);
      setPaletteToggle(prefersDark.matches);
    }

    const setDarkPaletteFromMediaQuery = (mediaQuery: MediaQueryListEvent) => {
      if (localStorage.getItem("darkMode") === null) {
        toggleDarkPalette(mediaQuery.matches);
        setPaletteToggle(mediaQuery.matches);
      }
    };

    prefersDark.addEventListener("change", setDarkPaletteFromMediaQuery);

    return () => {
      prefersDark.removeEventListener("change", setDarkPaletteFromMediaQuery);
    };
  }, []);

  return (
    <div>
      <IonApp className="mb-20">
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/welcome">
                <LandingPage />
              </Route>
              <Route exact path="/profile">
                <ProfilePage />
              </Route>
              <Route exact path="/home">
                <HomePage />
              </Route>
              <Route exact path="/tab1">
                <Tab1 />
              </Route>

              <Route path="/course/:courseId" component={CoursePage} />
              <Route
                path="/course/:courseId/exam"
                component={CourseExamination}
              />

              <Route exact path="/">
                <Redirect to="/welcome" />
              </Route>
            </IonRouterOutlet>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
      <div
        className={`fixed bottom-0 left-0 right-0 shadow-md flex justify-center items-center  py-2 ${
          paletteToggle ? "bg-[#1f1f1f] text-white" : "bg-white text-black"
        }`}
      >
        <a
          href="/welcome"
          className={`flex flex-col items-center mr-[100px] ${
            window.location.pathname === "/welcome"
              ? "text-blue-500 font-bold"
              : ""
          }`}
        >
          <BookOpenIcon className="h-6 w-6" />
          <span>Courses</span>
        </a>

        <a
          href="/profile"
          className={`flex flex-col items-center mr-[100px] ${
            window.location.pathname === "/profile"
              ? "text-blue-500 font-bold"
              : ""
          }`}
        >
          <UserIcon className="h-6 w-6" />
          <span>Profile</span>
        </a>

        <button onClick={toggleChange} className="flex flex-col items-center">
          {paletteToggle ? (
            <>
              <SunIcon className="h-6 w-6" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <MoonIcon className="h-6 w-6" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default App;
