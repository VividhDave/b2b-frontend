import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [

  {
    title: true,
    name: 'Master Components'
  },
  {
    name: 'Master Data',
    url: '/master',
    icon: 'icon-layers',
    children: [
      {
        name: 'Category',
        url: '/master/category/category-list',
        icon: 'icon-list'
      },
      {
        name: 'Sub-Category',
        url: '/master/sub-category/sub-category-list',
        icon: 'icon-list'
      },
      {
        name: 'Child-Category',
        url: '/master/chilled-category/chilled-category-list',
        icon: 'icon-list'
      },
      {
        name: 'Brand',
        url: '/master/brand/brand-list',
        icon: 'icon-list'
      },
      {
        name: 'Product Attribute',
        url: '/master/product-attribute/product-attribute-list',
        icon: 'icon-list'
      }
    ]
  },

  {
    title: true,
    name: 'Product Management'
  },
  {
    name: 'Product Data',
    url: '/product',
    icon: 'icon-layers',
    children: [
      {
        name: 'Product',
        url: '/product/product-list',
        icon: 'icon-list  '
      },
    ]
  },
  {
    title: true,
    name: 'Order Management'
  },
  {
    name: 'Order History',
    url: '/order',
    icon: 'icon-layers',
    children: [
      {
        name: 'Placed Order',
        url: '/order/order-detail/order-details-list',
        icon: 'icon-list  '
      },
      {
        name: 'Return Order',
        url: '/order/return-order/return-order-list',
        icon: 'icon-list  '
      },
      {
        name: 'Bulk Order',
        url: '/order/bulk-order/bulk-order-list',
        icon: 'icon-list  '
      },

    ]
  },

  {
    title: true,
    name: 'User Management'
  },
  {
    name: 'Users History',
    url: '/user',
    icon: 'icon-layers',
    children: [
      {
        name: 'Web',
        url: '/user/user-list',
        icon: 'icon-user'
      },
      {
        name: 'Mobile',
        url: '/user/user-list-mobile',
        icon: 'icon-user'
      },
    ]
  },

  {
    title: true,
    name: 'Payment History'
  },
  {
    name: 'Payment History',
    url: '/payment/payment-list',
    icon: 'icon-layers',
  },
  {
    title: true,
    name: 'Log History'
  },
  {
    name: 'Log History',
    url: '/log/logs-list',
    icon: 'icon-layers',
  },
];
