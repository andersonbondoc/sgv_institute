import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { BookOpenIcon, UserIcon } from "@heroicons/react/outline";

import Tab1 from './pages/Tab1';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import CoursePage from './pages/CoursePage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
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

          <Route path="/course/:courseCode" component={CoursePage} />
         
          <Route exact path="/">
            <Redirect to="/welcome" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="welcome" href="/welcome">
            <BookOpenIcon className="h-6 w-6" />
            <IonLabel>Courses</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <UserIcon className="h-6 w-6" />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
          {/* <IonTabButton tab="home" href="/home">
            <HomeIcon className="h-6 w-6" />
            <IonLabel>Home</IonLabel>
          </IonTabButton> */}
          {/* <IonTabButton tab="tab1" href="/tab1">
            <UserIcon className="h-6 w-6" />
            <IonLabel>Knowledge Agent</IonLabel>
          </IonTabButton> */}
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
