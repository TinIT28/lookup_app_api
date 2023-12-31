"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
let CloudinaryService = class CloudinaryService {
    async convertImagesCloudinary(images) {
        const uploadPromises = images.map((image) => new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload(image, { upload_preset: 'n8a057sj' }, (error, result) => {
                if (result) {
                    console.log(result.url);
                    resolve(result.url);
                }
                else {
                    reject(error);
                }
            });
        }));
        try {
            const uploadedUrls = await Promise.all(uploadPromises);
            return uploadedUrls;
        }
        catch (error) {
            console.log(error);
            throw new Error('Failed to upload images to Cloudinary');
        }
    }
};
CloudinaryService = __decorate([
    (0, common_1.Injectable)()
], CloudinaryService);
exports.CloudinaryService = CloudinaryService;
//# sourceMappingURL=cloudinary.service.js.map