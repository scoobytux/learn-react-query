import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./components/Home.page";
import RQSuperHeroesPage from "./components/RQSuperHeroes.page";
import SuperHeroesPage from "./components/SuperHeroes.page";
import RQSuperHero from "./components/RQSuperHero.page";
import ParallelQueries from "./components/ParallelQueries.page";
import DynamicParallelQueries from "./components/DynamicParallelQueries.page";
import DependentQueries from "./components/DependentQueries.page";

// React Query
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rq-parallel" element={<ParallelQueries />} />
            <Route
              path="/rq-dependent"
              element={<DependentQueries email="tu.lna07@gmail.com" />}
            />
            <Route
              path="/rq-dynamic-parallel"
              element={<DynamicParallelQueries heroIds={[1, 2]} />}
            />
            <Route path="/rq-super-heroes/:heroId" element={<RQSuperHero />} />
            <Route path="super-heroes" element={<SuperHeroesPage />} />
            <Route path="rq-super-heroes" element={<RQSuperHeroesPage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
