from django.contrib import admin

# Register your models here.
from moelasware.models import Tag, Quiz, Test, Submission, Review, QuizAnswer, SubmissionAnswer, QuizTag

admin.site.register(Tag)
admin.site.register(Quiz)
admin.site.register(Test)
admin.site.register(Submission)
admin.site.register(Review)
admin.site.register(QuizAnswer)
admin.site.register(SubmissionAnswer)
admin.site.register(QuizTag)
