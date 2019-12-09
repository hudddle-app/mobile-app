import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";

import Auth from "./src/screens/Auth";
import Dashboard from "./src/screens/Dashboard";

//---AWS Amplify---//
Amplify.configure(aws_exports);
//---AWS Amplify---//

const AppNavigator = createStackNavigator(
  {
    Authentication: { screen: Auth },
    Dashboard: { screen: Dashboard }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default createAppContainer(AppNavigator);
