﻿i m p o r t   {   P h o n e ,   M e s s a g e S q u a r e ,   M a p P i n   }   f r o m   ' l u c i d e - r e a c t ' ; 
 
 i m p o r t   {   L e a d   }   f r o m   ' . . / . . / . . / t y p e s / l e a d ' ; 
 
 
 
 t y p e   L e a d A c t i o n s P r o p s   =   { 
 
     l e a d :   L e a d ; 
 
     o n C a l l :   ( )   = >   v o i d ; 
 
     o n M e s s a g e :   ( )   = >   v o i d ; 
 
     o n D i r e c t i o n s :   ( )   = >   v o i d ; 
 
 } ; 
 
 
 
 e x p o r t   c o n s t   L e a d A c t i o n s   =   ( {   l e a d ,   o n C a l l ,   o n M e s s a g e ,   o n D i r e c t i o n s   } :   L e a d A c t i o n s P r o p s )   = >   { 
 
     r e t u r n   ( 
 
         < d i v   c l a s s N a m e = " b g - g r a y - 8 0 0   p x - 4   p b - 4 " > 
 
             < d i v   c l a s s N a m e = " f l e x   g a p - 2 " > 
 
                 < b u t t o n 
 
                     o n C l i c k = { o n C a l l } 
 
                     c l a s s N a m e = " b g - b l u e - 5 0 0   h o v e r : b g - b l u e - 6 0 0   t e x t - w h i t e   p x - 4   p y - 2   r o u n d e d   f l e x   i t e m s - c e n t e r   g a p - 2 " 
 
                 > 
 
                     < P h o n e   c l a s s N a m e = " w - 4   h - 4 "   / > 
 
                     < s p a n > C a l l < / s p a n > 
 
                 < / b u t t o n > 
 
                 < b u t t o n 
 
                     o n C l i c k = { o n M e s s a g e } 
 
                     c l a s s N a m e = " b g - g r a y - 7 0 0   h o v e r : b g - g r a y - 6 0 0   t e x t - w h i t e   p x - 4   p y - 2   r o u n d e d   f l e x   i t e m s - c e n t e r   g a p - 2 " 
 
                 > 
 
                     < M e s s a g e S q u a r e   c l a s s N a m e = " w - 4   h - 4 "   / > 
 
                     < s p a n > M e s s a g e < / s p a n > 
 
                 < / b u t t o n > 
 
                 < b u t t o n 
 
                     o n C l i c k = { o n D i r e c t i o n s } 
 
                     c l a s s N a m e = " b g - g r a y - 7 0 0   h o v e r : b g - g r a y - 6 0 0   t e x t - w h i t e   p x - 4   p y - 2   r o u n d e d   f l e x   i t e m s - c e n t e r   g a p - 2 " 
 
                 > 
 
                     < M a p P i n   c l a s s N a m e = " w - 4   h - 4 "   / > 
 
                     < s p a n > D i r e c t i o n s < / s p a n > 
 
                 < / b u t t o n > 
 
             < / d i v > 
 
         < / d i v > 
 
     ) ; 
 
 } ; 
 
 
 
 e x p o r t   d e f a u l t   L e a d A c t i o n s ; 


