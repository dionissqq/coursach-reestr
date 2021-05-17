import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Index from './Index/Index';
import Login from './Login';
import Search from './Search/Search';
import NewSID from './NewSID/NewSID';
import NotFound from './NotFound/NotFound.js';
import Nav from '../components/nav/Nav';
import NewMedia from './NewMedia';
import NewAngency from './NewAngency';
import EditAngency from './EditAngency';
import EditMedia from './EditMedia';
import Media from './SID/Media';
import Agency from './SID/Agency';
import AgencyCertificate from './Certificate/AgencyCertificate';
import MediaCertificate from './Certificate/MediaCertificate';

function App() {
  return (
    <Router>
      <Route path="/" component={Nav} />
      <div id="content_outter">
        <main>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/sid/new" component={NewSID} />
            <Route exact path="/media/new" component={NewMedia} />
            <Route exact path="/agencies/new" component={NewAngency} />
            <Route exact path="/agencies/:id(\d+)/certificate" component={AgencyCertificate} />
            <Route exact path="/agencies/:id(\d+)/edit" component={EditAngency} />
            <Route exact path="/media/:id(\d+)/certificate" component={MediaCertificate} />
            <Route exact path="/media/:id(\d+)/edit" component={EditMedia} />
            <Route exact path="/agencies/:id(\d+)" component={Agency} />
            <Route exact path="/media/:id(\d+)" component={Media} />
            <Route exact path="/not_found" component={NotFound} />
            <Route path="/" component={NotFound} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
