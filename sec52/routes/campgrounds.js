const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { campgroundSchema } = require('../schemas.js');
const {isLoggedIn} = require('../middleware')

const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground');

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds})
 });
 
 router.get('/new', isLoggedIn, (req, res) => {
     res.render('campgrounds/new');
 });
 
 router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
 }));
 
 router.get('/:id', catchAsync(async (req, res) => {
     const campground = await Campground.findById(req.params.id).populate('reviews').populate('author');
    //  console.log(campground);
     if(!campground) {
        req.flash('error', 'Cannot find that campground!');
        res.redirect('/campgrounds');
        }
        res.render('campgrounds/show', { campground });
 }));
 
 router.get('/:id/edit', isLoggedIn, catchAsync(async(req, res) => {
     const { id } = req.params;
     const campground = await Campground.findById(id);
    if(!campground) {
       req.flash('error', 'You do not have permission to do that');
       return res.redirect(`/campgrounds/${id}`)
    }
     if(!campground.author.equals(req.user._id)) {
        req.flash('error', 'Cannot find that campground!');
        res.redirect('/campgrounds');
        }
     res.render('campgrounds/edit', { campground });
 }));
 
 router.put('/:id', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
     const { id } = req.params;
     const campground = await Campground.findById(id);
     if(!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/campgrounds/${id}`)
     }
     const camp = await Campground.findByIdAndUpdate(id, { ...req.body.campground});
     req.flash('success', 'Successfully updated campground!')
     res.redirect(`/campgrounds/${campground._id}`)
 }));
 
 router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {

     const { id } = req.params; // destructure,  finds id's value and assigns it to id for use here
     await Campground.findByIdAndDelete(id); // find campground by id and delete
     req.flash('success', 'Successfully deleted campground');
     res.redirect('/campgrounds'); // redirect back to campground
 }));

 module.exports = router;