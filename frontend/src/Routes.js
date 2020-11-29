import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AdminPanel from "./containers/AdminPanel/AdminPanel";
import LoginRegister from "./containers/LoginRegister/LoginRegister";
import PlugPage from "./containers/PlugPage/PlugPage";
import CreateNewArticle from "./containers/CreateNewArticle/CreateNewArticle";
import CreateNewCategory from "./containers/CreateNewCategory/CreateNewCategory";
import EditCategory from "./containers/EditCategory/EditCategory";
import EditArticle from "./containers/EditArticle/EditArticle";
import EditUser from "./containers/EditUser/EditUser";
import SingleArticlePage from "./containers/SingleArticlePage/SingleArticlePage";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
        <Route {...props} /> :
        <Redirect to={redirectTo} />
};

const Routes = ({user}) => {
    return (
        <Layout>
            <Switch>
                <ProtectedRoute
                    isAllowed={user && user.role === 'admin'}
                    path="/"
                    exact
                    component={AdminPanel}
                    redirectTo='/plug-page'
                />
                <ProtectedRoute
                    path='/login'
                    exact
                    component={LoginRegister}
                    isAllowed={!user}
                    redirectTo='/plug-page'
                />
                <ProtectedRoute
                    path='/register'
                    exact
                    component={LoginRegister}
                    isAllowed={!user}
                    redirectTo='/plug-page'
                />
                <ProtectedRoute
                    path='/create-new-article'
                    exact
                    component={CreateNewArticle}
                    isAllowed={user && user.role === 'admin'}
                    redirectTo='/plug-page'
                />
                <ProtectedRoute
                    path='/create-new-category'
                    exact
                    component={CreateNewCategory}
                    isAllowed={user && user.role === 'admin'}
                    redirectTo='/plug-page'
                />
                <ProtectedRoute
                    path='/edit-category/:id'
                    exact
                    component={EditCategory}
                    isAllowed={user && user.role === 'admin'}
                    redirectTo='/plug-page'
                />
                <ProtectedRoute
                    path='/edit-article/:id'
                    exact
                    component={EditArticle}
                    isAllowed={user && user.role === 'admin'}
                    redirectTo='/plug-page'
                />
                <ProtectedRoute
                    path='/edit-user/:id'
                    exact
                    component={EditUser}
                    isAllowed={user}
                    redirectTo='/plug-page'
                />
                <ProtectedRoute
                    path='/article/:id'
                    exact
                    component={SingleArticlePage}
                    isAllowed={user}
                    redirectTo='/plug-page'
                />
                <Route path='/plug-page' exact component={PlugPage} />
            </Switch>
        </Layout>
    );
};

export default Routes;