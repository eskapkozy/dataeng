import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './modules/home'
import Story from './modules/story'
import Members from './modules/members'
import Write from './modules/write'
import Auth from './modules/auth'
import GetStarted from './modules/get-started'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/members" element={<Members />} />
          <Route path="/write" element={<Write />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/get-started" element={<GetStarted />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
