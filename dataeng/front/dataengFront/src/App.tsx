import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import PageTransition from './components/PageTransition'
import Home from './modules/home'
import Story from './modules/story'
import Members from './modules/members'
import Write from './modules/write'
import Auth from './modules/auth'
import GetStarted from './modules/get-started'
import Events from './modules/events'
import './App.css'

function AppContent() {
  const location = useLocation()

  return (
    <Layout>
      <PageTransition>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/members" element={<Members />} />
          <Route path="/write" element={<Write />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/get-started" element={<GetStarted />} />
        </Routes>
      </PageTransition>
    </Layout>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
