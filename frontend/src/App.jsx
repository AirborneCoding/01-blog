import { createBrowserRouter, RouterProvider } from "react-router-dom"

// pages
import {
  Login, Register,
  HomeLayout,
  HomePage,
  PostsPage,
  SinglePost,
  AuthorPage,
  DashboardLayout,
  ProfileHome,
  AllPosts,
  Settings,
  MyProfile,
  AddPost,
  EditPost,
  AboutPage,
  SearchByCa_Ha,
  AllSearchs,
  Categories,
} from "@/pages"

// erros 
import {
  NotFound,
  Error
} from "@/errors"


// infastructions
import ProtectedAuth from "@/infrastructure/ProtectedAuth"

const router = createBrowserRouter([
  // *************HOME*****************
  {
    path: "/",
    errorElement: <Error />,
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/posts",
        children: [
          {
            index: true,
            element: <PostsPage />,
          },
          {
            path: "/posts/:id",
            element: <SinglePost />,
          },
          {
            path: "/posts/search",
            element: <SearchByCa_Ha />,
          }
        ]
      },
      {
        path: "/author/:id",
        element: <AuthorPage />
      },
      {
        path: "/search",
        element: <AllSearchs />
      },
      {
        path: "/about_us",
        element: <AboutPage />
      },
      {
        path: "/categories",
        element: <Categories />
      }
    ]
  },
  // *************PROFILE (auth users) *****************
  {
    path: "/my_profile",
    errorElement: <Error />,
    element: <ProtectedAuth isExist={false}  ><DashboardLayout /></ProtectedAuth>,
    children: [
      {
        index: true,
        element: <ProfileHome />
      },
      {
        path: "/my_profile/profile_info",
        element: <MyProfile />,
      },
      {
        path: "/my_profile/write_post",
        element: <AddPost />,
      },
      {
        path: "/my_profile/edit_post/:id",
        element: <EditPost />,
      },
      {
        path: "/my_profile/my_posts",
        element: <AllPosts />,
      },
      {
        path: "/my_profile/settings",
        element: <Settings />,
      },
    ]
  },

  // *************AUTH*****************
  {
    path: "/login",
    element: <ProtectedAuth isExist={true} ><Login /></ProtectedAuth>
  },
  {
    path: "/register",
    element: <ProtectedAuth isExist={true}><Register /></ProtectedAuth>,
  },

  // *************404*****************
  {
    path: "*",
    element: <NotFound />
  }
])

const App = () => {
  return <RouterProvider router={router} />
};

export default App;
