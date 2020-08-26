<?php

namespace App\Services\Files;

use Storage;
use Gumlet\ImageResize;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use finfo;

class ImageCleaner
{

    protected $file;
    protected $fileName;
    protected $cleanedImage;
    protected $tmpImagePath;
    protected $fullTmpImagePath;
    protected $tmpStorageDisk;

    protected $maxWidth = 1280;
    protected $maxHeight = 720;

    public function __construct($file, $fileName)
    {
        $this->file = $file;
        $this->fileName = $fileName;
        $this->fullTmpImagePath = storage_path(ImageStorage::getFullTmpStoragePath().$fileName);
        $this->tmpImagePath = ImageStorage::getTmpStoragePath().$fileName;
        $this->tmpStorageDisk = ImageStorage::getTmpStorageDisk();
        $this->cleanImage();
    }

    /**
     * Public accessor
     * 
     */
    public function getCleanedImage()
    {
        return $this->cleanedImage;
    }

    /**
     * Clean image from uploaded file
     * Save it in a temporary file, then load it to apply cleaning
     * 
     */
    protected function cleanImage()
    {
        // Store file in tmp folder
        Storage::disk($this->tmpStorageDisk)->put($this->tmpImagePath, $this->file);
        
        // Apply cleaning with ImageResize librairy and save
        $cleanedImage = new ImageResize($this->fullTmpImagePath);
        $cleanedImage->resizeToBestFit($this->maxWidth, $this->maxHeight);
        $cleanedImage->save($this->fullTmpImagePath);
        
        // Load cleaned file, create UploadedFile object and put in cleanedImage property
        $cleanedImage = Storage::disk($this->tmpStorageDisk)->get($this->tmpImagePath);
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $this->cleanedImage = new UploadedFile(
            $this->fullTmpImagePath,
            $this->fileName,
            $finfo->file($this->fullTmpImagePath),
            filesize($this->fullTmpImagePath),
            0,
            false
        );
    }


    /**
     * Remove temporary image file created for cleaning
     * 
     */
    public function removeTemporaryFile()
    {
        Storage::disk($this->tmpStorageDisk)->delete($this->tmpImagePath);
    }
}
