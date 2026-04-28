<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Term extends Model
{
    /** @use HasFactory<\Database\Factories\TermFactory> */
    use HasFactory;

    public function section(){
        return $this->belongsTo(Section::class);
    }

    public function admin(){
        return $this->belongsTo(Admin::class, 'created_by');
    }
}
