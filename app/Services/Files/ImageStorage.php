<?php

namespace App\Services\Files;

use Storage;
use File;
use Response;

class ImageStorage
{

    protected static $STORAGE_PATH = "public/resources";


    /**
     * Get image from storage
     * 
     */
    public static function getImage($fileName)
    {
        $image_path = ImageStorage::$STORAGE_PATH.'/'.$fileName;
        $file = Storage::get($image_path);
        $type = File::mimeType(storage_path('app/'.$image_path));
        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    }


    /**
     * Store image in storage
     * 
     */
    public static function storeImage($file, $fileName)
    {
        Storage::putFileAs(ImageStorage::$STORAGE_PATH, $file, $fileName);
    }


    /**
     * Store image in storage
     * 
     */
    public static function deleteImage($fileName)
    {
        $image_path = ImageStorage::$STORAGE_PATH.'/'.$fileName;
        Storage::delete($image_path);
    }

}
