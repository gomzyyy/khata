// setBusinessOwner: (
//     state,
//     action: PayloadAction<{
//       name: BusinessOwner['name'];
//       userId: BusinessOwner['ownerId'];
//       businessName?: BusinessOwner['businessName'];
//       phoneNumber?: BusinessOwner['phoneNumber'];
//       businessType?: BusinessType;
//       businessDescription?: BusinessOwner['businessDescription'];
//       businessAddress?: BusinessOwner['businessAddress'];
//       currency?: CurrencyType;
//       password: BusinessOwner['password'];
//     }>,
//   ) => {
//     const {
//       name,
//       userId,
//       phoneNumber,
//       businessType,
//       businessName,
//       businessDescription,
//       businessAddress,
//       currency,
//       password,
//     } = action.payload;
//     if (!name || !userId) {
//       showToast({type: 'info', text1: 'Error: BusinessOwner.ts;'});
//       return;
//     }
//     const prevBusinessOwner = state.app.previousOwners;
//     const ifExisting = prevBusinessOwner.find(s => s.ownerId === userId);
//     if (ifExisting) return;
//     const newBusinessOwner: BusinessOwner = {
//       id: randomId(),
//       name,
//       ownerId: userId,
//       phoneNumber: phoneNumber,
//       EmployeeData: [],
//       assets: [],
//       liabilities: [],
//       password,
//       sessionId: Date.now(),
//       equity: 100,
//       role: AdminRole.OWNER,
//       businessName,
//       businessDescription,
//       businessAddress,
//       businessType,
//       inventory: [],
//       customers: [],
//       createdAt: Date.now().toString(),
//       updatedAt: Date.now().toString(),
//       otp: {
//         otp: '',
//         expiredAt: new Date(Date.now()),
//         generatedAt: new Date(Date.now()),
//       },
//     };
//     state.app.previousOwners.push(newBusinessOwner);
//     state.app.currency = currency ?? CurrencyType.INR;
//     state.BusinessOwner = newBusinessOwner;
//   },
//   toogleLockApp: (state, action: PayloadAction<boolean>) => {
//     state.app.appLocked = action.payload;
//   },
//   editBusinessOwner: (
//     state,
//     action: PayloadAction<{
//       name: BusinessOwner['name'];
//       userId: BusinessOwner['ownerId'];
//       phoneNumber?: BusinessOwner['phoneNumber'];
//       businessType?: BusinessType;
//       businessDescription?: BusinessOwner['businessDescription'];
//       image?: BusinessOwner['image'];
//     }>,
//   ) => {
//     const {
//       name,
//       userId,
//       phoneNumber,
//       businessType,
//       businessDescription,
//       image,
//     } = action.payload;
//     const prevBusinessOwner = state.app.previousOwners;
//     const ifExisting = prevBusinessOwner.find(s => s.ownerId === userId);
//     if (!ifExisting) return;
//     const newBusinessOwner: BusinessOwner = {
//       ...ifExisting,
//       name,
//       phoneNumber,
//       businessDescription,
//       image,
//       businessType: businessType ?? BusinessType.RETAIL,
//       updatedAt: Date.now().toString(),
//     };
//     const newPrevBusinessOwners = state.app.previousOwners.map(s =>
//       s.ownerId === ifExisting.ownerId ? newBusinessOwner : s,
//     );
//     state.app.previousOwners = newPrevBusinessOwners;
//     state.BusinessOwner = newBusinessOwner;
//   },
//   removeExistingUser: (
//     state,
//     action: PayloadAction<{userId: BusinessOwner['ownerId']}>,
//   ) => {
//     const {userId} = action.payload;
//     const prevBusinessOwner = state.app.previousOwners;
//     const user = prevBusinessOwner.find(s => s.ownerId === userId);
//     if (!user) return;
//     const newPrevUsersArr = prevBusinessOwner.filter(
//       s => s.ownerId !== userId,
//     );
//     state.app.previousOwners = newPrevUsersArr;
//   },
//   setAccessPassword: (
//     state,
//     action: PayloadAction<[string, string, string, string]>,
//   ) => {
//     const newAccessPasscode = action.payload;

//     state.BusinessOwner.accessPasscode = newAccessPasscode;
//   },
//   login: (state, action: PayloadAction<{userId: string}>) => {
//     const prevUsers = state.app.previousOwners;
//     const {userId} = action.payload;
//     const user = prevUsers.find(s => s.ownerId === userId);
//     if (!user) return;
//     const existingUser = {...user, sessionId: Date.now()};
//     if (!existingUser) {
//       return;
//     }
//     state.BusinessOwner = existingUser;
//   },
//   logout: (
//     state,
//     action: PayloadAction<{userId: BusinessOwner['id'] | Employee['id']}>,
//   ) => {
//     const {userId} = action.payload;
//     const currUser = state.BusinessOwner;
//     const user = state.app.previousOwners.find(s => s.ownerId === userId);
//     if (!user) return;
//     const updatedPrevUsers = state.app.previousOwners.map(s =>
//       s.ownerId === userId ? {...currUser, sessionId: null} : s,
//     );
//     state.app.previousOwners = updatedPrevUsers;
//     state.BusinessOwner.sessionId = null;
//   },
//   setSearchResult: (
//     state,
//     action: PayloadAction<{
//       customers?: Customer[];
//       employees?: Employee[];
//       type: 'CUSTOMER' | 'EMPLOYEE';
//     }>,
//   ) => {
//     const {customers, employees, type} = action.payload;
//     if (customers && type === 'CUSTOMER') {
//       state.app.searchResults.customerResults = customers;
//     }
//     if (employees && type === 'EMPLOYEE') {
//       state.app.searchResults.employeeResults = employees;
//     }
//   },
//   resetSearchResults: state => {
//     state.app.searchResults.customerResults = [];
//     state.app.searchResults.employeeResults = [];
//   },
//   createCustomers: (
//     state,
//     action: PayloadAction<{
//       name: Customer['name'];
//       phoneNumber?: Customer['phoneNumber'];
//       address?: Customer['address'];
//       image?: Customer['image'];
//     }>,
//   ) => {
//     const currentCustomers: Customer[] = state.BusinessOwner.customers;
//     const newCustomer: Customer = {
//       ...action.payload,
//       id: Date.now().toString(),
//       businessOwnerId: state.BusinessOwner.id,
//       createdAt: new Date(Date.now()).toDateString(),
//       updatedAt: new Date(Date.now()).toDateString(),
//     };
//     state.BusinessOwner.customers = [newCustomer, ...currentCustomers];
//   },
//   updateCustomer: (state, action: PayloadAction<Customer>) => {
//     const updatedCustomer = action.payload;
//     state.BusinessOwner.customers = state.BusinessOwner.customers.map(s =>
//       s.id === updatedCustomer.id ? {...s, ...updatedCustomer} : s,
//     );
//   },
//   removeCustomer: (state, action: PayloadAction<Customer>) => {
//     const deletedCustomer = action.payload;
//     state.BusinessOwner.customers = state.BusinessOwner.customers.filter(
//       s => s.id !== deletedCustomer.id,
//     );
//   },
//   setTheme: (state, action: PayloadAction<AppTheme>) => {
//     const choosedTheme: AppTheme = action.payload;
//     state.app.currentTheme = choosedTheme;
//   },
//   addNewUdhar: (
//     state,
//     action: PayloadAction<{customer: Customer; products: SoldProduct[]}>,
//   ) => {
//     const newUdharList = action.payload.products;
//     const customer = action.payload.customer;

//     const allUdhars =
//       state.BusinessOwner.customers.find(s => s.id === customer.id)
//         ?.unpaidPayments || [];

//     const updatedUdhars: SoldProduct[] = [...allUdhars];

//     newUdharList.forEach(newProduct => {
//       const existingProductIndex = updatedUdhars.findIndex(
//         d =>
//           d.id === newProduct.id &&
//           new Date(d.addedAt).toDateString() ===
//             new Date(newProduct.addedAt).toDateString(),
//       );

//       if (existingProductIndex !== -1) {
//         updatedUdhars[existingProductIndex] = {
//           ...updatedUdhars[existingProductIndex],
//           count:
//             (updatedUdhars[existingProductIndex].count || 0) +
//             (newProduct.count || 0),
//           addedAt: updatedUdhars[existingProductIndex].addedAt, // Keep original addedAt
//         };
//       } else {
//         updatedUdhars.push({...newProduct});
//       }
//     });
//     const updatedCustomers = state.BusinessOwner.customers.map(s =>
//       s.id === customer.id ? {...s, unpaidPayments: updatedUdhars} : s,
//     );

//     state.BusinessOwner.customers = updatedCustomers;
//     const newInventory = state.BusinessOwner.inventory.map(s => {
//       const foundProduct = newUdharList.find(d => s.id === d.id);
//       return foundProduct
//         ? {
//             ...s,
//             totalSold: (s.totalSold || 0) + foundProduct.count,
//             stock: (s.stock || 0) - foundProduct.count,
//           }
//         : s;
//     });

//     state.BusinessOwner.inventory = newInventory;
//   },

//   removeUdhar: (
//     state,
//     action: PayloadAction<{
//       customer: Customer;
//       product: SoldProduct;
//       addedDate: number;
//     }>,
//   ) => {
//     const {customer, product, addedDate} = action.payload;
//     const customerIndex = state.BusinessOwner.customers.findIndex(
//       c => c.id === customer.id,
//     );
//     if (customerIndex !== -1) {
//       state.BusinessOwner.customers[customerIndex] = {
//         ...state.BusinessOwner.customers[customerIndex],
//         unpaidPayments:
//           state.BusinessOwner.customers[customerIndex].unpaidPayments?.filter(
//             s =>
//               !(
//                 s.id === product.id &&
//                 new Date(s.addedAt).setHours(0, 0, 0, 0) ===
//                   new Date(addedDate).setHours(0, 0, 0, 0)
//               ),
//           ) || [],
//       };
//     }
//   },

//   removePaidUdhar: (
//     state,
//     action: PayloadAction<{customer: Customer; product: SoldProduct}>,
//   ) => {
//     const {customer, product} = action.payload;

//     const customerIndex = state.BusinessOwner.customers.findIndex(
//       c => c.id === customer.id,
//     );

//     if (customerIndex !== -1) {
//       state.BusinessOwner.customers[customerIndex] = {
//         ...state.BusinessOwner.customers[customerIndex],
//         paidPayments:
//           state.BusinessOwner.customers[customerIndex].paidPayments?.filter(
//             s =>
//               new Date(s.addedAt).toISOString().split('T')[0] !==
//               new Date(product.addedAt).toISOString().split('T')[0],
//           ) || [],
//       };
//     }
//   },

//   setToPaid: (
//     state,
//     action: PayloadAction<{customer: Customer; product: SoldProduct}>,
//   ) => {
//     const customers = state.BusinessOwner.customers;
//     const {customer, product} = action.payload;

//     const updatedCustomers = customers.map(c => {
//       if (c.id === customer.id) {
//         const newUnpaidPayments = (c.unpaidPayments ?? []).filter(
//           s => s.id !== product.id,
//         );

//         const newPaidPayments = [product, ...(c.paidPayments ?? [])];

//         return {
//           ...c,
//           unpaidPayments: newUnpaidPayments,
//           paidPayments: newPaidPayments,
//         };
//       }
//       return c;
//     });

//     state.BusinessOwner.customers = updatedCustomers;
//   },

//   setToUnpaid: (
//     state,
//     action: PayloadAction<{customer: Customer; product: SoldProduct}>,
//   ) => {
//     const customers = state.BusinessOwner.customers;
//     const {customer, product} = action.payload;

//     const updatedCustomers = customers.map(c => {
//       if (c.id === customer.id) {
//         return {
//           ...c,
//           unpaidPayments: [product, ...(c.unpaidPayments ?? [])],
//           paidPayments: (c.paidPayments ?? []).filter(
//             s => s.id !== product.id,
//           ),
//         };
//       }
//       return c;
//     });
//     state.BusinessOwner.customers = updatedCustomers;
//   },

//   addProductToInventory: (
//     state,
//     action: PayloadAction<{product: Product}>,
//   ) => {
//     const newProduct = action.payload.product;
//     state.BusinessOwner.inventory = [
//       newProduct,
//       ...state.BusinessOwner.inventory,
//     ];
//   },
//   editInventoryProduct: (
//     state,
//     action: PayloadAction<{product: Product}>,
//   ) => {
//     const {product} = action.payload;
//     const foundProduct = state.BusinessOwner.inventory.find(
//       s => s.id === product.id,
//     );
//     if (foundProduct) {
//       Object.assign(foundProduct, {
//         ...product,
//         updatedAt: Date.now().toString(),
//       });
//     }
//   },
//   removeProductFromInventory: (
//     state,
//     action: PayloadAction<{product: Product}>,
//   ) => {
//     const {product} = action.payload;
//     const newInventory = state.BusinessOwner.inventory.filter(
//       s => s.id !== product.id,
//     );
//     state.BusinessOwner.inventory = newInventory;
//   },
//   createEmployee: (
//     state,
//     action: PayloadAction<{
//       name: User['name'];
//       salary: Employee['salary'];
//       status: Employee['status'];
//       shift: Employee['shift'];
//       phoneNumber: Employee['phoneNumber'];
//       gender: Employee['gender'];
//       address: Employee['address'];
//       image: Employee['image'];
//     }>,
//   ) => {
//     const {name, salary, status, shift, phoneNumber, gender, address, image} =
//       action.payload;
//     state.BusinessOwner.EmployeeData.push({
//       name,
//       id: randomId(),
//       phoneNumber,
//       gender,
//       address,
//       image,
//       role: AdminRole.EMPLOYEE,
//       businessOwner: state.BusinessOwner.id,
//       createdAt: Date.now().toString(),
//       updatedAt: Date.now().toString(),
//       hireDate: Date.now().toString(),
//       salary,
//       status: status || EmploymentStatus.ACTIVE,
//       shift: shift || Shift.MORNING,
//     });
//   },
//   updateEmployee: (
//     state,
//     action: PayloadAction<{
//       id: User['id'];
//       name: User['name'];
//       salary: Employee['salary'];
//       status: Employee['status'];
//       shift: Employee['shift'];
//       phoneNumber: Employee['phoneNumber'];
//       image: Employee['image'];
//       address: Employee['address'];
//     }>,
//   ) => {
//     const updateEmployee = action.payload;
//     const existingEmployee = state.BusinessOwner.EmployeeData.find(
//       s => s.id === updateEmployee.id,
//     );
//     if (!existingEmployee) return;
//     state.BusinessOwner.EmployeeData = state.BusinessOwner.EmployeeData.map(
//       s => (s.id === updateEmployee.id ? {...s, ...updateEmployee} : s),
//     );
//   },
//   removeEmployee: (state, action: PayloadAction<Employee>) => {
//     const deletedEmployee = action.payload;
//     state.BusinessOwner.EmployeeData =
//       state.BusinessOwner.EmployeeData.filter(
//         s => s.id !== deletedEmployee.id,
//       );
//   },

// export const {
//     // setBusinessOwner,
//     // editBusinessOwner,
//     // logout,
//     // login,
//     // toogleLockApp,
//     // setAccessPassword,
//     // createCustomers,
//     // updateCustomer,
//     // removeCustomer,
//     // setSearchResult,
//     // resetSearchResults,
//     // addNewUdhar,
//     // removeUdhar,
//     // removePaidUdhar,
//     // setToPaid,
//     // setToUnpaid,
//     // addProductToInventory,
//     // editInventoryProduct,
//     // removeProductFromInventory,
//     // setTheme,
//     // createEmployee,
//     // updateEmployee,
//     // removeEmployee,
//   } = UserSlice.actions;
