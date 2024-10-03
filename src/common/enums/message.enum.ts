export enum BadRequestMessage{
    InValidLoginData="اطلاعات ارسال شده برای ورود صحیح نمی باشد",
    InValidRegisterData="اطلاعات ارسال شده برای ثبت نام صحیح نمی باشد"
}
export enum AuthMessage{
    NotFoundAccount="حساب کاربری یافت نشد",
    AlreadyExistsAccount="حساب کاربری با این مشخصات از قبل وجود دارد",
    ExpiredOtpCode="کد تایید منقضی شده است مجدد تلاش نمایید",
    TryAgain="دوباره تلاش کنید",
    WrongOtpCode="کد تایید اشتباه است",
    LoginAgain="مجدد وارد حساب کاربری خود شوید",
    LoginRequired="وارد حساب کاربری خود شوید"
}
export enum NotFoundMessage{
    NotFound="موردی یافت نشد",
    NotFoundCategory="دسته بندی یافت نشد",
    NotFoundPost="مقاله یافت نشد",
    NotFoundUser="کاربری یافت نشد"
}
export enum ValidationMessage{
    InvalidImageFormat="فرمت تصویر باید jpg یا png باشد"
}
export enum PublicMessages{
    SendOtp="کد با موفقیت ارسال شد",
    LoggedIn="با موفقیت وارد حساب کاربری شدید",
    Created="با موفقیت ایجاد شد",
    Deleted="با موفقیت حذف شد",
    Updated="با موفقیت به روز رسانی شد",
    Inserted="با موفقیت ایجاد شد"
}
export enum ConflictMessages{
    CategoryTitle="عنوان دسته بندی تکراری می باشد",
}