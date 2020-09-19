<?php

namespace App\Services\Files;

use Storage;
use Response;

class ImageStorage
{

    protected static $STORAGE_PATH = 'public/resources/';
    protected static $TMP_STORAGE_PATH = 'public/tmp/';
    protected static $FULL_TMP_STORAGE_PATH = 'app\\public\\tmp\\';

    protected static $MAX_WIDTH = 1280;
    protected static $MAX_HEIGHT = 720;

    /**
     * Public accessors
     * 
     */
    public static function getTmpStorageDisk()
    {
        return env('TMP_STORAGE_DISK');
    }

    public static function getImageStorageDisk()
    {
        return env('IMAGE_STORAGE_DISK');
    }

    public static function getFullTmpStoragePath()
    {
        return ImageStorage::$FULL_TMP_STORAGE_PATH;
    }

    public static function getTmpStoragePath()
    {
        return ImageStorage::$TMP_STORAGE_PATH;
    }


    /**
     * Get image from storage
     * 
     */
    public static function getImage($fileName)
    {
        $image_path = ImageStorage::$STORAGE_PATH.$fileName;
        $file = Storage::disk(ImageStorage::getImageStorageDisk())->get($image_path);
        $type = Storage::disk(ImageStorage::getImageStorageDisk())->mimeType($image_path);
        $response = Response::make($file, 200);
        $response->header('Content-Type', $type);

        return $response;
    }


    /**
     * Store image in storage
     * 
     */
    public static function storeImage($file, $fileName)
    {
        // Clean Image
        $imageCleaner = new ImageCleaner($file, $fileName);
        $file = $imageCleaner->getCleanedImage();
        // Store it
        Storage::disk(ImageStorage::getImageStorageDisk())->putFileAs(ImageStorage::$STORAGE_PATH, $file, $fileName);
        $imageCleaner->removeTemporaryFile();
    }


    /**
     * Delete image from storage
     * 
     */
    public static function deleteImage($fileName)
    {
        $image_path = ImageStorage::$STORAGE_PATH.$fileName;
        Storage::disk(ImageStorage::getImageStorageDisk())->delete($image_path);
    }

}
