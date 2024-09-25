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

}
export enum ValidationMessage{

}
export enum PublicMessages{
    SendOtp="کد با موفقیت ارسال شد",
    LoggedIn="با موفقیت وارد حساب کاربری شدید"
}