import type { ReactNode } from "react";
import i18n from './i18n';
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { ArticleView } from "./components/AdminDashboard/ArticleView";
import { RoadmapsView } from "./pages/Dashboard/RoadmapsView";
import { UserView } from "./pages/Userview/UserView";
import Roadmap from "./pages/Userview/Roadmap";
import FeedbackOverview from "./pages/Userview/FeedbackOverview";

// Create placeholder components for the new routes
const CalendarView = () => <div>Calendar View Content</div>;
const TeamView = () => <div>Team View Content</div>;
const MessagesView = () => <div>Messages View Content</div>;
const DocumentsView = () => <div>Documents View Content</div>;
const SettingsView = () => <div>Settings View Content</div>;

interface PageUrlsProps {
    pageName: string;
    urlPath: string;
    component?: ReactNode;
    icon?: ReactNode;
}

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class RoutesAndUrls {
    public static readonly HOME: PageUrlsProps = {
        pageName: i18n.t('dashboard'),
        urlPath: `/${i18n.t('dashboard').toLowerCase()}`,
        component: <Dashboard><div>as</div></Dashboard>,
    };
    
    public static readonly ARTRICLE: PageUrlsProps = {
        pageName: i18n.t('article'),
        urlPath: `/dashboard/${i18n.t('article').toLowerCase()}`,
        component: <Dashboard><ArticleView /></Dashboard>,
    };
    
    public static readonly ROADMAPS: PageUrlsProps = {
        pageName: i18n.t('roadmaps'),
        urlPath: `/dashboard/${i18n.t('roadmaps').toLowerCase()}`,
        component: <Dashboard><RoadmapsView /></Dashboard>,
    };
    
    // Added missing routes
    public static readonly CALENDAR: PageUrlsProps = {
        pageName: i18n.t('calendar'),
        urlPath: `/dashboard/${i18n.t('calendar').toLowerCase()}`,
        component: <Dashboard><CalendarView /></Dashboard>,
    };
    
    public static readonly TEAM: PageUrlsProps = {
        pageName: i18n.t('team'),
        urlPath: `/dashboard/${i18n.t('team').toLowerCase()}`,
        component: <Dashboard><TeamView /></Dashboard>,
    };
    
    public static readonly MESSAGES: PageUrlsProps = {
        pageName: i18n.t('messages'),
        urlPath: `/dashboard/${i18n.t('messages').toLowerCase()}`,
        component: <Dashboard><MessagesView /></Dashboard>,
    };
    
    public static readonly DOCUMENTS: PageUrlsProps = {
        pageName: i18n.t('documents'),
        urlPath: `/dashboard/${i18n.t('documents').toLowerCase()}`,
        component: <Dashboard><DocumentsView /></Dashboard>,
    };
    
    public static readonly SETTINGS: PageUrlsProps = {
        pageName: i18n.t('settings'),
        urlPath: `/dashboard/${i18n.t('settings').toLowerCase()}`,
        component: <Dashboard><SettingsView /></Dashboard>,
    };

    public static readonly USER: PageUrlsProps = {
        pageName: i18n.t('user'),
        urlPath: `/dashboard/${i18n.t('user').toLowerCase()}`,
        component: <UserView><SettingsView /></UserView>,
    };

    public static readonly PUBLIC_ROADMAP: PageUrlsProps = {
        pageName: i18n.t('roadmap'),
        urlPath: `/${i18n.t('roadmap').toLowerCase()}`,
        component: <UserView><Roadmap></Roadmap></UserView>,
    };

    public static readonly PUBLIC_CHANGELOG: PageUrlsProps = {
        pageName: i18n.t('changelog'),
        urlPath: `/${i18n.t('changelog').toLowerCase()}`,
        component: <UserView>ChangeLog Component</UserView>,
    };

    public static readonly PUBLIC_FEEDBACK: PageUrlsProps = {
        pageName: i18n.t('feedback'),
        urlPath: `/${i18n.t('feedback').toLowerCase()}`,
        component: <UserView><FeedbackOverview/></UserView>,
    };
}

export const pageUrlsArray: PageUrlsProps[] = Object.values(RoutesAndUrls);


export default pageUrlsArray;