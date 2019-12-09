import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import AuthScreen from "./src/screens/Auth";

//---AWS Amplify---//
Amplify.configure(aws_exports);
//---AWS Amplify---//

const navigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    initialRouteName: "Auth",
    defaultNavigationOptions: {
      title: "Hudddle"
    }
  }
);

export default createAppContainer(navigator);
