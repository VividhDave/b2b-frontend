import * as moment from 'moment';
import {TABLE_COLUMN} from '../../../interface/table-column.interface';

export class TableColumnData {
  static readonly CATEGORY_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'name', header: 'Name', sort: 'name'},
    {field: 'code', header: 'Code', sort: 'code'},
    // {field: 'status', header: 'status'}
  ];

  static readonly SUB_CATEGORY_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'name', header: 'Name', sort: 'name'},
    {field: 'code', header: 'Code', sort: 'code'},
    {field: 'category', header: 'Category Name', subfield: 'name', sort: 'category.name'},
    {field: 'gst', header: 'GST %'},
  ];

  static readonly CHILLED_CATEGORY_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'name', header: 'Name', sort: 'name'},
    {field: 'subCategory', header: 'Sub Category Name', subfield: 'name', sort: 'subCategory.name'},
  ];

  static readonly BRAND_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'name', header: 'Name', sort: 'name'},
    // {field: 'status', header: 'status'}
  ];

  static readonly PRODUCT_ATTRIBUTE_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'name', header: 'Name', sort: 'name'},
    {field: 'type', header: 'Type', sort: 'type'},
    // {field: 'category', header: 'Category Name', subfield: 'name', sort: 'category.name'},
  ];

  static readonly USER_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'id', header: 'Id', sort: 'id'},
    {field: 'username', header: 'Name', sort: 'username'},
    // {field: 'shopName', header: 'Shop Name', sort: 'shopName'},
    {field: 'email', header: 'Email', sort: 'email'},
    // {field: 'phone', header: 'Phone', sort: 'phone'},
    // {field: 'gstin', header: 'GSTIN', sort: 'gstin'},
  ];

  static readonly USER_COLUMN_NAME_MOBILE: Array<TABLE_COLUMN> = [
    {field: 'id', header: 'Id', sort: 'id'},
    {field: 'username', header: 'Name', sort: 'username'},
    {field: 'shopName', header: 'Shop Name', sort: 'shopName'},
    {field: 'email', header: 'Email', sort: 'email'},
    {field: 'whatsappMobileNumber', header: 'Phone', sort: 'whatsappMobileNumber'},
    {field: 'gstin', header: 'GSTIN', sort: 'gstin'},
  ];

  static readonly USER_ADDRESS_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'address', header: 'Address', sort: 'address'},
    {field: 'addressType', header: 'Address Type', sort: 'addressType'},
    {field: 'city', header: 'City', sort: 'city'},
    {field: 'state', header: 'State', sort: 'state'},
    {field: 'pincode', header: 'Pincode', sort: 'pincode'},
    {field: 'phone', header: 'Phone', sort: 'phone'},
    {field: 'status', header: 'Status', sort: 'status'},
  ];
  static readonly ATTRIBUTE_TYPE: Array<any> = [
    {id: 'int', value: 'INT'},
    {id: 'string', value: 'STRING'},
    {id: 'date', value: 'DATE'},
    {id: 'boolean', value: 'BOOLEAN'},
    {id: 'textbox', value: 'TEXTBOX'},
    {id: 'other', value: 'Other'},
  ];

  static readonly PRODUCT_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'productCode', header: 'Product Code', sort: 'productCode'},
    {field: 'productName', header: 'Product Name', sort: 'productName'},
    {field: 'displayName', header: 'Display Name', sort: 'displayName'},
    {field: 'price', header: 'Price', sort: 'price'},
    {field: 'discountPrice', header: 'Discount Price', sort: 'discountPrice'},
    {field: 'brand', subfield: 'name', header: 'Brand', sort: 'brand.name'},
    {field: 'category', subfield: 'name', header: 'Category', sort: 'category.name'},
    {field: 'subCategory', subfield: 'name', header: 'SubCategory', sort: 'subCategory.name'},
    // {field: 'chilledCategory', subfield: 'name', header: 'Child Category', sort: 'chilledCategory.name'},
  ];

  static readonly PROMOTION_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'promoName', header: 'Promotion Name', sort: 'promoName'},
    {field: 'promoStartDate', header: 'Start Date', sort: 'promoStartDate'},
    {field: 'promoEndDate', header: 'End Date', sort: 'promoEndDate'},
  ];

  static readonly PROMOTION_TYPE_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'promoType', header: 'Promotion Type', sort: 'promoType'},
    {field: 'promoTypeCode', header: 'Type Code', sort: 'promoTypeCode'},
    {field: 'status', header: 'Status', sort: 'status'},
  ];

  static readonly CREATE_PROMOTION_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'promoType', header: 'Promotion Type'},
  ];

  static readonly PROMOTION_LIST: Array<TABLE_COLUMN> = [
    {field: 'checkoutDisplayText', header: 'Promotion Name'},
    {field: 'startDate', header: 'Start Date'},
    {field: 'endDate', header: 'End Date'},
    {field: 'claimCode', header: 'Claim Code'},
    {field: 'checkoutDisplayText', header: 'Display Name'},
    {field: 'trackingId', header: 'Tracking ID'},
  ];

  static readonly PAYMENT_HISTORY_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'virtual_account_id', header: 'Smart Collect Id', sort: 'virtualAccountId'},
    {field: 'user_name', header: 'User', sort: 'userName'},
    {field: 'created_date', header: 'Date of Payment', sort: 'created_date', },
    {field: 'event', header: 'Event', sort: 'event'},
    {field: 'transaction_id', header: 'Transaction Id', sort: 'transactionId'},
    {field: 'amount', header: 'Amount', sort: 'amount'},
    {field: 'currency', header: 'Currency', sort: 'currency'},
    {field: 'status', header: 'Status', sort: 'status'},
  ];

  static readonly PLACED_ORDER_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'id', header: 'Order Id', sort: 'id'},
    {field: 'user', subfield: 'username', header: 'User', sort: 'user.username'},
    {field: 'productTotalAmount', header: 'Sale Amount', sort: 'productTotalAmount'},
    {field: 'shippingCharge', header: 'Shipping', sort: 'shippingCharge'},
    {field: 'createdDate', header: 'OrderDate', sort: 'createdDate'},
    {field: 'status', header: 'Status', sort: 'status'},
  ];
  static readonly PLACED_ORDER_PRODUCT_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'qty', header: 'Qty', sort: 'qty'},
    {field: 'product', subfield: 'discountPrice', header: 'Discount Price', sort: 'discountPrice'},
    {field: 'shippingCharge', header: 'Shipping Charge', sort: 'shippingCharge'},
    {field: 'orderStatus', header: 'OrderStatus', sort: 'orderStatus'},
    {field: 'product', subfield: 'displayName', header: 'ProductName', sort: 'product.displayName'},
  ];

  static readonly PLACED_ORDER_STATUS_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'placeOrder', subfield: 'id', header: 'Placeorder Id', sort: 'placeOrder.id'},
    {field: 'statusMessage', header: 'Status', sort: 'statusMessage'},
    {field: 'description', header: 'Description', sort: 'description'},
    {field: 'notified', header: 'Notified', sort: 'notified'},
    {field: 'createdBy', header: 'Created By', sort: 'createdBy'},
  ];

  static readonly RETURN_ORDER_STATUS_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'statusMessage', header: 'Status', sort: 'status'},
    {field: 'description',  header: 'Description', sort: 'description'},
    {field: 'notified', header: 'Notified', sort: 'notified'},
    {field: 'createdBy' , header: 'Created By', sort: 'createdBy'},
  ];

  static readonly ORDER_STATUS_DROPDOWN_VALUE: Array<any> = [
    { id: 'Placed', name: 'Placed'},
    { id:"Packed", name:"Packed"},
    { id:"Intransit", name:"Intransit"},
    { id:"Arrived", name:"Arrived"},
    { id:"Delivered", name:"Delivered"},
  ];

  static readonly RETURN_STATUS_DROPDOWN_VALUE:Array<any>=[

    { id:"Return Order Initiated",name:"Return Order Initiated"},
    { id:"Return Order Recieved from User",name:"Return Order Recieved from User"},
    { id:"Return Payment Initiated",name:"Return Payment Initiated"},
    { id:"Delivered",name:"Return Payment Succesfully"},
    { id:"Error",name:"Error"},
    { id:"Other",name:"Other"},
  ];

  static readonly RETURN_ORDER_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'orderId', header: 'Order Id', sort: 'user.username'},
    {field: 'id', header: 'Return Order Id', sort: 'user.username'},
    {field: 'user', subfield: 'username', header: 'User', sort: 'user.username'},
    // {field: 'returnProduct', subfield: 'price', header: 'Total Sale Amount', sort: 'productTotalAmount'},
    {field: 'createdDate', header: 'Order Date', sort: 'createdDate'},
    // {field: 'id',  header: 'Return Payment Id', sort: 'id'},
    {field: 'status', header: 'Return Status', sort: 'status'},
    
  ];
  static readonly RETURN_ORDER_PRODUCT_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'qty', header: 'Qty', sort: 'qty'},
    {field: 'product', subfield: 'discountPrice', header: 'Price', sort: 'product.discountPrice'},
    {field: 'description', header: 'Description', sort: 'description'},
    {field: 'returnOrCancelOrder', subfield: 'placeOrder',innerSubField:"shippingCharge", header: 'Shipping Charge', sort: 'returnOrCancelOrder.placeOrder.shippingCharge'},
    {field: 'product', subfield: 'displayName', header: 'ProductName', sort: 'product.displayName'},
  ];


  static readonly LOGS_HISTORY_COLUMN_NAME: Array<TABLE_COLUMN> = [
    {field: 'createdBy', header: 'User', sort: 'createdBy'},
    {field: 'message', header: 'Message', sort: 'message'},
    {field: 'exception', header: 'Exception', sort: 'exception'},
    {field: 'controllerName', header: 'Controller Name', sort: 'controllerName'},
    {field: 'methodName', header: 'Method Name', sort: 'methodName'},
  ];


  static readonly BULK_ORDER: Array<TABLE_COLUMN> = [
    {field: 'user', subfield: 'firstName', header: 'User', sort: 'user.firstName'},
    {field: 'product', subfield: 'productName', header: 'Product', sort: 'product.productName'},
    {field: 'description', header: 'Description', sort: 'description'},
    {field: 'product', subfield: 'price', header: 'Selling Price', sort: 'product.price'},
    {field: 'userNegotiatePrice', header: 'User Negotiated Price', sort: 'userNegotiatePrice'},
    {field: 'adminNegotiatePrice', header: 'Admin Negotiated Price', sort: 'adminNegotiatePrice'},
    {field: 'quantity', header: 'Quantity', sort: 'quantity'},
    {field: 'orderStatus', header: 'Order Status', sort: 'orderStatus'}
  ];
}
