import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { CachingModule } from './core/modules/caching/caching.module';
import { DatabaseModule } from './core/modules/database/database.module';
import { StaticPathModule } from './core/modules/static-path/static-path.module';
import { HealthModule } from './core/modules/health/health.module';
import { MongoModule } from './core/modules/mongo/mongo.module';
import { MsClientModule } from './core/modules/ms-client/ms-client.module';
import { SeederModule } from './core/modules/seeder/seeder.module';
import { SessionModule } from './core/modules/session/session.module';
import { JwtAuthGuard } from './modules/auth/jwt/jwt-auth.guard';
// import { FirebaseJwtAuthGuard } from './modules/auth/firebase-jwt/firebase-jwt-auth.guard';
import { RolesGuard } from './modules/auth/roles.guard';
import { QueryGuard } from './core/guards/query.guard';
import { SocketModule } from './core/modules/socket/socket.module';
import { AppGateway } from './app.gateway';
// import { EmailModule } from './core/modules/email/email.module';
// import { TwilioModule } from './core/modules/twilio/twilio.module';
// import { SendGridModule } from './core/modules/send-grid/send-grid.module';
// import { StripeModule } from './core/modules/stripe/stripe.module';
// import { AwsModule } from './core/modules/aws/aws.module';
// import { FirebaseModule } from './core/modules/firebase/firebase.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { LocalAuthModule } from './modules/auth/local/local-auth.module';
// import { FirebaseAuthModule } from './modules/auth/firebase/firebase-auth.module';
// import { GoogleAuthModule } from './modules/auth/google/google-auth.module';
// import { FacebookAuthModule } from './modules/auth/facebook/facebook-auth.module';
// import { AppleAuthModule } from './modules/auth/apple/apple-auth.module';
import { PageModule } from './modules/page/page.module';
import { TemplateModule } from './modules/template/template.module';
import { NotificationModule } from './modules/notification/notification.module';
import { SettingModule } from './modules/setting/setting.module';
import { CountryModule } from './modules/country/country.module';
import { StateModule } from './modules/state/state.module';
import { CustomerModule } from './modules/customer/customer.module'
import { Ride_detailsModule } from './modules/ride_details/ride_details.module';
import { Card_detailsModule } from './modules/card_details/card_details.module';
import { Add_productModule } from './modules/add_product/add_product.module';
import { AddressModule } from './modules/address/address.module';
import { Add_vehicleModule } from './modules/add_vehicle/add_vehicle.module';
import { Add_driverModule } from './modules/add_driver/add_driver.module';
import { Special_bookingModule } from './modules/special_booking/special_booking.module';
import { Bank_accountModule } from './modules/bank_account/bank_account.module';
import { Product_ordersModule } from './modules/product_orders/product_orders.module';
import { Ride_bookingModule } from './modules/ride_booking/ride_booking.module';
import { Order_productModule } from './modules/order_product/order_product.module';
import { MileageModule } from './modules/mileage/mileage.module';
import { Coupon_codeModule } from './modules/coupon_code/coupon_code.module';
import { Payment_reportModule } from './modules/payment_report/payment_report.module';
import { Customer_adminModule } from './modules/customer_admin/customer_admin.module';
import { Driver_adminModule } from './modules/driver_admin/driver_admin.module';
import { AdminModule } from './modules/admin/admin.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    CachingModule,
    ScheduleModule.forRoot(),
    StaticPathModule,
    DatabaseModule,
    MongoModule,
    SeederModule,
    MsClientModule,
    HealthModule,
    SessionModule,
    SocketModule,
    // AwsModule,
    // StripeModule,
    // FirebaseModule,
    // TwilioModule,
    // SendGridModule,
    // EmailModule,
    AuthModule,
    LocalAuthModule,
    // FirebaseAuthModule,
    // GoogleAuthModule,
    // FacebookAuthModule,
    // AppleAuthModule,
    SettingModule,
    UserModule,
    RoleModule,
    CountryModule,
    StateModule,
    PageModule,
    TemplateModule,
    NotificationModule,
    CustomerModule,
    Ride_detailsModule,
    Card_detailsModule,
    Add_productModule,
    AddressModule,
    Add_vehicleModule,
    Add_driverModule,
    Special_bookingModule,
    Bank_accountModule,
    Product_ordersModule,
    Ride_bookingModule,
    Order_productModule,
    MileageModule,
    Coupon_codeModule,
    Payment_reportModule,
    Customer_adminModule,
    Driver_adminModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppGateway,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: QueryGuard,
    },
  ],
})
export class AppModule {}
