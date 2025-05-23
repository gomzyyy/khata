import {
  AdminRole,
  BusinessType,
  MeasurementType,
  PaymentHistoryReferenceType,
  PaymentState,
  ProductType,
} from '../../enums';
import {
  Customer,
  Employee,
  Owner,
  Partner,
  Product,
  SoldProduct,
  SoldProductPaymentHistory,
  UnknownPaymentHistory,
} from '../../types';

export interface APIReturnType {
  message: string;
  success: boolean;
}

export interface ValidateTokenData {
  role: AdminRole;
}

export interface ValidateTokenReturnType extends APIReturnType {
  data: {
    user: Owner | Partner | Employee | undefined;
  };
}

export interface LoginAPIReturnType extends APIReturnType {
  data: {
    token: string;
    user: Owner | Partner | Employee;
  };
}
export interface SignupAPIReturnType extends APIReturnType {
  data: {
    user: Owner;
    token: string;
  };
}

export interface SignupData {
  query: {};
  body: {
    name: string; // //
    phoneNumber?: string;
    password: string; //
    email: string; //
    address?: string;
    userId: string; // //
    businessAddress: string; // //
    businessName: string; // //
    businessPhoneNumber: string; // //
    businessDescription?: string; //
    businessType: BusinessType; // //
    role: AdminRole; //
    gstNumber?: string;
    uniqueReferralCode?: string;
  };
  media: {
    image: string | undefined;
  };
}
export interface LoginData {
  password: string;
  userId: string;
  role: AdminRole;
}
export interface createCustomerData {
  query: {
    role: AdminRole;
    creatorId: string;
    createdBy: AdminRole;
  };
  body: {
    name: string;
    address?: string;
    businessOwnerId: Owner['_id'];
    phoneNumber?: string;
    email?: string;
  };
  media?: {
    image?: string;
  };
}
export interface CreateCustomerAPIReturnType extends APIReturnType {
  data: {
    customer: Customer | undefined;
  };
}

export interface DeleteCustomerData {
  query: {
    customerId: string;
    role: AdminRole;
  };
}

export interface DeleteCustomerAPIReturnType extends APIReturnType {}

export interface UpdateCustomerData {
  query: {
    customerId: string;
    role: AdminRole;
    ownerId: string;
  };
  body: {
    name?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
  };
  media: {
    image?: string;
  };
}

export interface UpdateCustomerAPIReturnType extends APIReturnType {}

export interface GetOwnerAPIReturnType extends APIReturnType {
  data: {
    owner: Owner | undefined;
  };
}
export interface GetOwnerAPIData {
  role: AdminRole;
  ownerId: string;
}
export interface GetUserAPIReturnType extends APIReturnType {
  data: {
    user: Owner | Employee | Partner | undefined;
  };
}
export interface GetUserAPIData {
  role: AdminRole;
}

export interface CreateProductAPIData {
  query: {
    creatorId: string;
    role: AdminRole;
    ownerId: string;
  };
  body: {
    name: string;
    basePrice: number;
    quantity: number;
    measurementType: MeasurementType;
    stock: number;
    productCost: number;
    productType: ProductType;
    measurementTypeDescription?: string;
  };
  media: {
    image?: string;
  };
}

export interface CreateProductAPIReturnType extends APIReturnType {
  data: {
    product: Product | undefined;
  };
}

export interface DeleteProductAPIData {
  query: {
    productId: string;
    role: AdminRole;
    uid: string;
  };
}

export interface DeleteProductAPIReturnType extends APIReturnType {}

export interface SellProductData {
  query: {
    buyerId: string;
    sellerId: string;
    role: AdminRole;
  };
  body: {
    productId: string;
    count: number;
  };
}

export interface SellProductAPIReturnType extends APIReturnType {
  data: {
    soldProduct: SoldProduct | undefined;
    seller: Owner | Partner | Employee | undefined;
  };
}

export interface DeleteSoldProductData {
  query: {
    soldProductId: string;
    role: AdminRole;
  };
}

export interface DeleteSoldProductAPIReturnType extends APIReturnType {}

export interface RequestOtpAPIData {
  query: {
    uid: string;
    role: AdminRole;
  };
  body: {
    updatedEmail?: string;
  };
}
export interface RequestOtpAPReturnType extends APIReturnType {}

export interface ValidateOtpAPIData {
  query: {role: string; uid: string};
  body: {
    otp: string;
  };
}

export interface ValidateOtpAPReturnType extends APIReturnType {}

export interface ValidateReferralCodeAPReturnType extends APIReturnType {}
export interface ValidateReferralCodeAPIData {
  query: {
    referralCode: string;
  };
}
export interface GetSinglePaymentHistoryAPIData {
  query: {
    role: AdminRole;
    paymentType: PaymentHistoryReferenceType;
    paymentId: string;
    creatorId: string;
    createdBy: AdminRole;
  };
}
export interface GetSinglePaymentHistoryAPIReturnType extends APIReturnType {
  data: {
    paymentDetails:
      | SoldProductPaymentHistory
      | UnknownPaymentHistory
      | undefined;
  };
}

export interface CreateEmployeeAPIData {
  query: {
    creatorId: string;
    createdBy: AdminRole;
    role: AdminRole;
  };
  body: {
    name: string;
    userId: string;
    phoneNumber?: string;
    password: string;
    position: string;
    positionDescription?: string;
    email: string;
    address?: string;
    gender: string;
    department: string;
    departmentDescription?: string;
    salary: number;
    status: string;
    statusDescription?: string;
    skills?: string[]; // assuming it's an array of skills
    shift: string;
    shiftDescription?: string;
    reportsToModel?: string;
    businessOwnerId: string;
    hrUid?: string;
  };
  media: {
    image?: string;
  };
}

export interface CreateEmployeeReturnType extends APIReturnType {}

export interface DeleteEmployeeAPIData {
  query: {
    employeeId: string;
    role: AdminRole;
  };
}

export interface DeleteEmployeeReturnType extends APIReturnType {}

export interface UpdateUserLocationAPIData {
  query: {
    role: AdminRole;
  };
  body: {
    periodicLatitude?: number;
    periodicLongitude?: number;
    liveLatitude?: number;
    liveLongitude?: number;
  };
}

export interface UpdateUserLocationReturnType extends APIReturnType {}

export interface GetUserByIdAPIData {
  query: {
    role: AdminRole;
    userId: string;
    reqFor: AdminRole;
  };
}

export interface GetUserByIdAPIReturnType extends APIReturnType {
  data: {
    user: Owner | Employee | Partner | undefined;
    userType: AdminRole | undefined;
  };
}

export interface UpdateSoldProductStateData {
  query: {role: AdminRole; updatedState: PaymentState};
  body: {
    soldProducts: SoldProduct[];
  };
}
export interface UpdateSoldProductStateReturnType extends APIReturnType {}

export interface UploadPdfToCloudAPIData {
  query: {
    role:AdminRole,
  };
  media: {
    pdf:string
  };
}

export interface UploadPdfToCloudReturnType extends APIReturnType {
  data: {
    url?: string;
  };
}
