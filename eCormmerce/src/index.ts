import App from './app';
import AddToCartController from './controller/Cart.controller';
import AuthenticationController from './controller/authentication.controller';
import ItemController from './controller/item.controller';

const app = new App([new ItemController,new AuthenticationController,new AddToCartController],4000);

app.listen();